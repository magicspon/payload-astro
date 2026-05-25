/* @author https://github.com/janglad/shadcn-dropzone/tree/main */
import { cn } from '@ui/utils/cn'
import { createContext, useCallback, useContext, useMemo } from 'react'
import { Button, ButtonProps } from '../Button'
import styles from './Dropzone.module.css'
import { DropZoneContext, useDropzoneContext } from './context'
import { FileStatus, UseDropzoneReturn } from './types'

// eslint-disable-next-line @typescript-eslint/no-explicit-any

interface DropzoneProps<TUploadRes, TUploadError> extends UseDropzoneReturn<
	TUploadRes,
	TUploadError
> {
	children: React.ReactNode
}
export function Root<TUploadRes, TUploadError>(
	props: DropzoneProps<TUploadRes, TUploadError>,
) {
	const { children, ...rest } = props
	return (
		<DropZoneContext.Provider value={rest}>{children}</DropZoneContext.Provider>
	)
}

interface DropZoneAreaProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Area({ className, children, ...props }: DropZoneAreaProps) {
	const context = useDropzoneContext()

	if (!context) {
		throw new Error('DropzoneArea must be used within a Dropzone')
	}

	const { onFocus, onBlur, onDragEnter, onDragLeave, onDrop, ref } =
		context.getRootProps()

	return (
		// A11y behavior is handled through Trigger. All of these are only relevant to drag and drop which means this should be fine?
		// eslint-disable-next-line jsx-a11y/no-static-element-interactions
		<div
			ref={ref}
			onFocus={onFocus}
			onBlur={onBlur}
			onDragEnter={onDragEnter}
			onDragLeave={onDragLeave}
			onDrop={onDrop}
			{...props}
			aria-label="dropzone"
			className={cn(
				styles.area,
				context.isDragActive && styles['area--drag-active'],
				context.isInvalid && styles['area--invalid'],
				className,
			)}
		>
			{children}
		</div>
	)
}

export interface DropzoneDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {}

export function Description(props: DropzoneDescriptionProps) {
	const { className, ...rest } = props
	const context = useDropzoneContext()
	if (!context) {
		throw new Error('DropzoneDescription must be used within a Dropzone')
	}

	return (
		<p
			id={context.rootDescriptionId}
			{...rest}
			className={cn(styles.description, className)}
		/>
	)
}

interface DropzoneFileListContext<TUploadRes, TUploadError> {
	onRemoveFile: () => Promise<void>
	onRetry: () => Promise<void>
	fileStatus: FileStatus<TUploadRes, TUploadError>
	canRetry: boolean
	dropzoneId: string
	messageId: string
}

const DropzoneFileListContext = createContext<
	DropzoneFileListContext<unknown, unknown>
>({
	onRemoveFile: async () => {},
	onRetry: async () => {},
	fileStatus: {} as FileStatus<unknown, unknown>,
	canRetry: false,
	dropzoneId: '',
	messageId: '',
})

const useDropzoneFileListContext = () => {
	return useContext(DropzoneFileListContext)
}

interface DropZoneFileListProps extends React.OlHTMLAttributes<HTMLOListElement> {}

export function FileList(props: DropZoneFileListProps) {
	const context = useDropzoneContext()
	if (!context) {
		throw new Error('DropzoneFileList must be used within a Dropzone')
	}
	return (
		<ol
			aria-label="dropzone-file-list"
			{...props}
			className={cn(styles['file-list'], props.className)}
		>
			{props.children}
		</ol>
	)
}

interface DropzoneFileListItemProps<
	TUploadRes,
	TUploadError,
> extends React.LiHTMLAttributes<HTMLLIElement> {
	file: FileStatus<TUploadRes, TUploadError>
}

export function FileListItem({
	className,
	...props
}: DropzoneFileListItemProps<any, any>) {
	const fileId = props.file.id
	const {
		onRemoveFile: cOnRemoveFile,
		onRetry: cOnRetry,
		getFileMessageId: cGetFileMessageId,
		canRetry: cCanRetry,
		inputId: cInputId,
	} = useDropzoneContext()

	const onRemoveFile = useCallback(
		() => cOnRemoveFile(fileId),
		[fileId, cOnRemoveFile],
	)
	const onRetry = useCallback(() => cOnRetry(fileId), [fileId, cOnRetry])
	const messageId = cGetFileMessageId(fileId)
	const isInvalid = props.file.status === 'error'
	const canRetry = useMemo(() => cCanRetry(fileId), [fileId, cCanRetry])
	return (
		<DropzoneFileListContext.Provider
			value={{
				onRemoveFile,
				onRetry,
				fileStatus: props.file,
				canRetry,
				dropzoneId: cInputId,
				messageId,
			}}
		>
			<li
				aria-label="dropzone-file-list-item"
				aria-describedby={isInvalid ? messageId : undefined}
				className={cn(styles['file-list-item'], className)}
				{...props}
			>
				{props.children}
			</li>
		</DropzoneFileListContext.Provider>
	)
}

interface DropzoneFileMessageProps extends React.HTMLAttributes<HTMLParagraphElement> {}

export function FileMessage(props: DropzoneFileMessageProps) {
	const { children, ...rest } = props
	const context = useDropzoneFileListContext()
	if (!context) {
		throw new Error(
			'DropzoneFileMessage must be used within a DropzoneFileListItem',
		)
	}

	const body =
		context.fileStatus.status === 'error'
			? String(context.fileStatus.error)
			: children
	return (
		<p
			id={context.messageId}
			{...rest}
			className={cn(styles['file-message'], rest.className)}
		>
			{body}
		</p>
	)
}
interface DropzoneMessageProps extends React.HTMLAttributes<HTMLParagraphElement> {}

export function Message(props: DropzoneMessageProps) {
	const { children, ...rest } = props
	const context = useDropzoneContext()
	if (!context) {
		throw new Error('DropzoneRootMessage must be used within a Dropzone')
	}

	const body = context.rootError ? String(context.rootError) : children

	if (!body) return null

	return (
		<p
			id={context.rootMessageId}
			{...rest}
			className={cn(styles['file-message'], rest.className)}
		>
			{body}
		</p>
	)
}

interface DropzoneRemoveFileProps extends ButtonProps {}

export function RemoveFile({ className, ...props }: DropzoneRemoveFileProps) {
	const context = useDropzoneFileListContext()
	if (!context) {
		throw new Error(
			'DropzoneRemoveFile must be used within a DropzoneFileListItem',
		)
	}
	return (
		<Button
			onClick={context.onRemoveFile}
			type="button"
			size="icon"
			{...props}
			className={cn(styles['disabled-button'], className)}
		>
			{props.children}
			<span className="sr-only">Remove file</span>
		</Button>
	)
}

interface DropzoneRetryFileProps extends ButtonProps {}

export function RetryFile({ className, ...props }: DropzoneRetryFileProps) {
	const context = useDropzoneFileListContext()

	if (!context) {
		throw new Error(
			'DropzoneRetryFile must be used within a DropzoneFileListItem',
		)
	}

	const canRetry = context.canRetry

	return (
		<Button
			aria-disabled={!canRetry}
			aria-label="retry"
			onClick={context.onRetry}
			type="button"
			size="icon"
			{...props}
			className={cn(styles['disabled-button'], className)}
		>
			{props.children}
			<span className="sr-only">Retry</span>
		</Button>
	)
}

interface DropzoneTriggerProps extends React.LabelHTMLAttributes<HTMLLabelElement> {}

export function Trigger({
	className,
	children,
	...props
}: DropzoneTriggerProps) {
	const context = useDropzoneContext()
	if (!context) {
		throw new Error('DropzoneTrigger must be used within a Dropzone')
	}

	const { fileStatuses, getFileMessageId } = context

	const fileMessageIds = useMemo(
		() =>
			fileStatuses
				.filter((file) => file.status === 'error')
				.map((file) => getFileMessageId(file.id)),
		[fileStatuses, getFileMessageId],
	)

	return (
		<label {...props} className={cn(styles.trigger, className)}>
			{children}
			<input
				{...context.getInputProps({
					style: {
						display: undefined,
					},
					className: 'sr-only',
					tabIndex: undefined,
					onChange: (e) => {
						console.log('[CHANGE]', e.target.value)
					},
				})}
				aria-describedby={
					context.isInvalid
						? [context.rootMessageId, ...fileMessageIds].join(' ')
						: undefined
				}
				aria-invalid={context.isInvalid}
			/>
		</label>
	)
}

interface InfiniteProgressProps extends React.HTMLAttributes<HTMLDivElement> {
	status: 'pending' | 'success' | 'error'
}

const valueTextMap = {
	pending: 'indeterminate',
	success: '100%',
	error: 'error',
}

export function InfiniteProgress({
	className,
	...props
}: InfiniteProgressProps) {
	const done = props.status === 'success' || props.status === 'error'
	const error = props.status === 'error'
	return (
		<div
			role="progressbar"
			aria-valuemin={0}
			aria-valuemax={100}
			aria-valuetext={valueTextMap[props.status]}
			{...props}
			className={cn(styles.progress, className)}
		>
			<div
				// TODO: add proper done transition
				className={cn(
					styles['progress-bar'],
					done ? styles['progress-bar--done'] : styles['progress-bar--pending'],
					error && styles['progress-bar--error'],
				)}
			/>
		</div>
	)
}
