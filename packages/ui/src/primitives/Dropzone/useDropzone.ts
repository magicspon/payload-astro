/* @author https://github.com/janglad/shadcn-dropzone/tree/main */
import { useCallback, useId, useMemo, useReducer, useState } from 'react'
import {
	Accept,
	FileRejection,
	useDropzone as rootUseDropzone,
} from 'react-dropzone'
import { DropzoneResult, FileStatus } from './types'

const fileStatusReducer = <TUploadRes, TUploadError>(
	state: FileStatus<TUploadRes, TUploadError>[],
	action:
		| {
				type: 'add'
				id: string
				fileName: string
				file: File
		  }
		| {
				type: 'remove'
				id: string
		  }
		| ({
				type: 'update-status'
				id: string
		  } & DropzoneResult<TUploadRes, TUploadError>),
): FileStatus<TUploadRes, TUploadError>[] => {
	switch (action.type) {
		case 'add':
			return [
				...state,
				{
					id: action.id,
					fileName: action.fileName,
					file: action.file,
					status: 'pending',
					tries: 1,
				},
			]
		case 'remove':
			return state.filter((fileStatus) => fileStatus.id !== action.id)
		case 'update-status':
			return state.map((fileStatus) => {
				if (fileStatus.id === action.id) {
					// eslint-disable-next-line @typescript-eslint/no-unused-vars
					const { id, type, ...rest } = action
					return {
						...fileStatus,
						...rest,
						tries:
							action.status === 'pending'
								? fileStatus.tries + 1
								: fileStatus.tries,
					} as FileStatus<TUploadRes, TUploadError>
				}
				return fileStatus
			})
	}
}

type DropZoneErrorCode = (typeof dropZoneErrorCodes)[number]
const dropZoneErrorCodes = [
	'file-invalid-type',
	'file-too-large',
	'file-too-small',
	'too-many-files',
] as const

const getDropZoneErrorCodes = (fileRejections: FileRejection[]) => {
	const errors = fileRejections.map((rejection) => {
		return rejection.errors
			.filter((error) =>
				dropZoneErrorCodes.includes(error.code as DropZoneErrorCode),
			)
			.map((error) => error.code) as DropZoneErrorCode[]
	})
	return Array.from(new Set(errors.flat()))
}

const getRootError = (
	errorCodes: DropZoneErrorCode[],
	limits: {
		accept?: Accept
		maxSize?: number
		minSize?: number
		maxFiles?: number
	},
) => {
	const errors = errorCodes.map((error) => {
		switch (error) {
			case 'file-invalid-type':
				const acceptedTypes = Object.values(limits.accept ?? {})
					.flat()
					.join(', ')
				return `only ${acceptedTypes} are allowed`
			case 'file-too-large':
				const maxMb = limits.maxSize
					? (limits.maxSize / (1024 * 1024)).toFixed(2)
					: 'infinite?'
				return `max size is ${maxMb}MB`
			case 'file-too-small':
				const roundedMinSize = limits.minSize
					? (limits.minSize / (1024 * 1024)).toFixed(2)
					: 'negative?'
				return `min size is ${roundedMinSize}MB`
			case 'too-many-files':
				return `max ${limits.maxFiles} files`
		}
	})
	const joinedErrors = errors.join(', ')
	return joinedErrors.charAt(0).toUpperCase() + joinedErrors.slice(1)
}

type UseDropzoneProps<TUploadRes, TUploadError> = {
	onDropFile: (
		file: File,
	) => Promise<
		Exclude<DropzoneResult<TUploadRes, TUploadError>, { status: 'pending' }>
	>
	onRemoveFile?: (id: string) => void | Promise<void>
	onFileUploaded?: (result: TUploadRes) => void
	onFileUploadError?: (error: TUploadError) => void
	onAllUploaded?: () => void
	onRootError?: (error: string | undefined) => void
	maxRetryCount?: number
	autoRetry?: boolean
	validation?: {
		accept?: Accept
		minSize?: number
		maxSize?: number
		maxFiles?: number
	}
	shiftOnMaxFiles?: boolean
} & (TUploadError extends string
	? {
			shapeUploadError?: (error: TUploadError) => string | void
		}
	: {
			shapeUploadError: (error: TUploadError) => string | void
		})
interface UseDropzoneReturn<TUploadRes, TUploadError> {
	getRootProps: ReturnType<typeof rootUseDropzone>['getRootProps']
	getInputProps: ReturnType<typeof rootUseDropzone>['getInputProps']
	onRemoveFile: (id: string) => Promise<void>
	onRetry: (id: string) => Promise<void>
	canRetry: (id: string) => boolean
	fileStatuses: FileStatus<TUploadRes, TUploadError>[]
	isInvalid: boolean
	isDragActive: boolean
	rootError: string | undefined
	inputId: string
	rootMessageId: string
	rootDescriptionId: string
	getFileMessageId: (id: string) => string
}

export const useDropzone = <TUploadRes, TUploadError = string>(
	props: UseDropzoneProps<TUploadRes, TUploadError>,
): UseDropzoneReturn<TUploadRes, TUploadError> => {
	const {
		onDropFile: pOnDropFile,
		onRemoveFile: pOnRemoveFile,
		shapeUploadError: pShapeUploadError,
		onFileUploaded: pOnFileUploaded,
		onFileUploadError: pOnFileUploadError,
		onAllUploaded: pOnAllUploaded,
		onRootError: pOnRootError,
		maxRetryCount,
		autoRetry,
		validation,
		shiftOnMaxFiles,
	} = props

	const inputId = useId()
	const rootMessageId = `${inputId}-root-message`
	const rootDescriptionId = `${inputId}-description`
	const [rootError, _setRootError] = useState<string | undefined>(undefined)

	const setRootError = useCallback(
		(error: string | undefined) => {
			_setRootError(error)
			if (pOnRootError !== undefined) {
				pOnRootError(error)
			}
		},
		[pOnRootError, _setRootError],
	)

	const [fileStatuses, dispatch] = useReducer(fileStatusReducer, [])

	const isInvalid = useMemo(() => {
		return (
			fileStatuses.filter((file) => file.status === 'error').length > 0 ||
			rootError !== undefined
		)
	}, [fileStatuses, rootError])

	const _uploadFile = useCallback(
		async (file: File, id: string, tries = 0) => {
			const result = await pOnDropFile(file)

			if (result.status === 'error') {
				if (autoRetry === true && tries < (maxRetryCount ?? Infinity)) {
					dispatch({ type: 'update-status', id, status: 'pending' })
					return _uploadFile(file, id, tries + 1)
				}

				dispatch({
					type: 'update-status',
					id,
					status: 'error',
					error:
						pShapeUploadError !== undefined
							? pShapeUploadError(result.error)
							: result.error,
				})
				if (pOnFileUploadError !== undefined) {
					pOnFileUploadError(result.error)
				}
				return
			}
			if (pOnFileUploaded !== undefined) {
				pOnFileUploaded(result.result)
			}
			dispatch({
				type: 'update-status',
				id,
				...result,
			})
		},
		[
			autoRetry,
			maxRetryCount,
			pOnDropFile,
			pShapeUploadError,
			pOnFileUploadError,
			pOnFileUploaded,
		],
	)

	const onRemoveFile = useCallback(
		async (id: string) => {
			await pOnRemoveFile?.(id)
			dispatch({ type: 'remove', id })
		},
		[pOnRemoveFile],
	)

	const canRetry = useCallback(
		(id: string) => {
			const fileStatus = fileStatuses.find((file) => file.id === id)
			return (
				fileStatus?.status === 'error' &&
				fileStatus.tries < (maxRetryCount ?? Infinity)
			)
		},
		[fileStatuses, maxRetryCount],
	)

	const onRetry = useCallback(
		async (id: string) => {
			if (!canRetry(id)) {
				return
			}
			dispatch({ type: 'update-status', id, status: 'pending' })
			const fileStatus = fileStatuses.find((file) => file.id === id)
			if (!fileStatus || fileStatus.status !== 'error') {
				return
			}
			await _uploadFile(fileStatus.file, id)
		},
		[canRetry, fileStatuses, _uploadFile],
	)

	const getFileMessageId = (id: string) => `${inputId}-${id}-message`

	const dropzone = rootUseDropzone({
		accept: validation?.accept,
		minSize: validation?.minSize,
		maxSize: validation?.maxSize,
		onDropAccepted: async (newFiles) => {
			setRootError(undefined)

			// useDropzone hook only checks max file count per group of uploaded files, allows going over if in multiple batches
			const fileCount = fileStatuses.length
			const maxNewFiles =
				validation?.maxFiles === undefined
					? Infinity
					: validation?.maxFiles - fileCount

			if (maxNewFiles < newFiles.length) {
				if (shiftOnMaxFiles === true) {
				} else {
					setRootError(getRootError(['too-many-files'], validation ?? {}))
				}
			}

			const slicedNewFiles =
				shiftOnMaxFiles === true ? newFiles : newFiles.slice(0, maxNewFiles)

			const onDropFilePromises = slicedNewFiles.map(async (file, index) => {
				if (fileCount + 1 > maxNewFiles) {
					await onRemoveFile(fileStatuses[index]!.id)
				}

				const id = crypto.randomUUID()
				dispatch({ type: 'add', fileName: file.name, file, id })
				await _uploadFile(file, id)
			})

			await Promise.all(onDropFilePromises)
			if (pOnAllUploaded !== undefined) {
				pOnAllUploaded()
			}
		},
		onDropRejected: (fileRejections) => {
			const errorMessage = getRootError(
				getDropZoneErrorCodes(fileRejections),
				validation ?? {},
			)
			setRootError(errorMessage)
		},
	})

	return {
		getRootProps: dropzone.getRootProps,
		getInputProps: dropzone.getInputProps,
		inputId,
		rootMessageId,
		rootDescriptionId,
		getFileMessageId,
		onRemoveFile,
		onRetry,
		canRetry,
		fileStatuses: fileStatuses as FileStatus<TUploadRes, TUploadError>[],
		isInvalid,
		rootError,
		isDragActive: dropzone.isDragActive,
	}
}
