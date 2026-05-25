import { createContext, useContext } from 'react'
import { UseDropzoneReturn } from './types'

export const DropZoneContext = createContext<UseDropzoneReturn<any, any>>({
	getRootProps: () => ({}) as never,
	getInputProps: () => ({}) as never,
	onRemoveFile: async () => {},
	onRetry: async () => {},
	canRetry: () => false,
	fileStatuses: [],
	isInvalid: false,
	isDragActive: false,
	rootError: undefined,
	inputId: '',
	rootMessageId: '',
	rootDescriptionId: '',
	getFileMessageId: () => '',
})

export const useDropzoneContext = <TUploadRes, TUploadError>() => {
	return useContext(DropZoneContext) as UseDropzoneReturn<
		TUploadRes,
		TUploadError
	>
}
