/**
 * useFileUpload Hook
 * Handles file upload functionality
 */

import { useState, useCallback } from 'react'
import { APP_CONFIG } from '@/constants/config'
import { isValidFileType, isValidFileSize } from '@/utils/validators'
import { logger } from '@/utils/logger'

export interface FileUploadOptions {
  maxSize?: number
  allowedTypes?: string[]
  multiple?: boolean
}

export interface UploadedFile {
  file: File
  preview?: string
  progress?: number
  error?: string
}

export function useFileUpload(options: FileUploadOptions = {}) {
  const {
    maxSize = APP_CONFIG.FILE_UPLOAD.MAX_SIZE,
    allowedTypes,
    multiple = false,
  } = options

  const [files, setFiles] = useState<UploadedFile[]>([])
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)

  const validateFile = useCallback(
    (file: File): string | null => {
      if (allowedTypes && !isValidFileType(file, allowedTypes)) {
        return `File type not allowed. Allowed types: ${allowedTypes.join(', ')}`
      }

      if (!isValidFileSize(file, maxSize)) {
        return `File size exceeds maximum of ${(maxSize / 1024 / 1024).toFixed(2)}MB`
      }

      return null
    },
    [allowedTypes, maxSize]
  )

  const handleFileSelect = useCallback(
    (selectedFiles: FileList | File[] | null) => {
      if (!selectedFiles) return

      const fileArray = Array.from(selectedFiles)
      const validFiles: UploadedFile[] = []

      fileArray.forEach((file) => {
        const error = validateFile(file)
        if (error) {
          logger.warn('File validation failed', { fileName: file.name, error })
          return
        }

        const uploadedFile: UploadedFile = {
          file,
          preview: file.type.startsWith('image/') ? URL.createObjectURL(file) : undefined,
        }

        validFiles.push(uploadedFile)
      })

      if (multiple) {
        setFiles((prev) => [...prev, ...validFiles])
      } else {
        setFiles(validFiles)
      }
    },
    [multiple, validateFile]
  )

  const removeFile = useCallback((index: number) => {
    setFiles((prev) => {
      const file = prev[index]
      if (file?.preview) {
        URL.revokeObjectURL(file.preview)
      }
      return prev.filter((_, i) => i !== index)
    })
  }, [])

  const clearFiles = useCallback(() => {
    files.forEach((file) => {
      if (file.preview) {
        URL.revokeObjectURL(file.preview)
      }
    })
    setFiles([])
    setUploadProgress(0)
  }, [files])

  const uploadFiles = useCallback(
    async (uploadFn: (file: File) => Promise<unknown>): Promise<unknown[]> => {
      if (files.length === 0) {
        throw new Error('No files to upload')
      }

      setIsUploading(true)
      setUploadProgress(0)

      try {
        const results = await Promise.all(
          files.map(async (uploadedFile, index) => {
            const result = await uploadFn(uploadedFile.file)
            setUploadProgress(((index + 1) / files.length) * 100)
            return result
          })
        )

        logger.info('Files uploaded successfully', { count: files.length })
        return results
      } catch (error) {
        logger.error('File upload failed', error)
        throw error
      } finally {
        setIsUploading(false)
        setUploadProgress(0)
      }
    },
    [files]
  )

  return {
    files,
    isUploading,
    uploadProgress,
    handleFileSelect,
    removeFile,
    clearFiles,
    uploadFiles,
    validateFile,
  }
}

