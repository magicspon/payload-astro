import { useDropzone as rootUseDropzone } from 'react-dropzone'

export type DropzoneResult<TUploadRes, TUploadError> =
	| {
			status: 'pending'
	  }
	| {
			status: 'error'
			error: TUploadError
	  }
	| {
			status: 'success'
			result: TUploadRes
	  }

export type FileStatus<TUploadRes, TUploadError> = {
	id: string
	fileName: string
	file: File
	tries: number
} & (
	| {
			status: 'pending'
			result?: undefined
			error?: undefined
	  }
	| {
			status: 'error'
			error: TUploadError
			result?: undefined
	  }
	| {
			status: 'success'
			result: TUploadRes
			error?: undefined
	  }
)

export interface UseDropzoneReturn<TUploadRes, TUploadError> {
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
