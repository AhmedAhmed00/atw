/**
 * UploadAnalysisDialog Component
 * Dialog for uploading analysis results
 */

import { useState, useRef } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Upload, FileText, X, Loader2, CheckCircle2 } from 'lucide-react'
import type { AnalysisResult } from '../types'

interface UploadAnalysisDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onUpload: (result: AnalysisResult) => void
}

interface FilePreview {
  file: File
  preview: string
}

export function UploadAnalysisDialog({
  open,
  onOpenChange,
  onUpload,
}: UploadAnalysisDialogProps) {
  const [selectedFile, setSelectedFile] = useState<FilePreview | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadSuccess, setUploadSuccess] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedFile({
        file,
        preview: URL.createObjectURL(file),
      })
      setUploadSuccess(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const file = e.dataTransfer.files?.[0]
    if (file) {
      setSelectedFile({
        file,
        preview: URL.createObjectURL(file),
      })
      setUploadSuccess(false)
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const removeFile = () => {
    if (selectedFile) {
      URL.revokeObjectURL(selectedFile.preview)
    }
    setSelectedFile(null)
    setUploadSuccess(false)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleUpload = async () => {
    if (!selectedFile) return

    setIsUploading(true)
    
    // Simulate upload delay
    await new Promise((resolve) => setTimeout(resolve, 1500))

    const result: AnalysisResult = {
      id: `ar-${Date.now()}`,
      fileName: selectedFile.file.name,
      fileUrl: selectedFile.preview,
      uploadedAt: new Date().toISOString(),
      uploadedBy: 'Dr. Admin', // Would come from auth context in real app
    }

    onUpload(result)
    setIsUploading(false)
    setUploadSuccess(true)

    // Auto-close after success
    setTimeout(() => {
      removeFile()
      setUploadSuccess(false)
      onOpenChange(false)
    }, 1500)
  }

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Upload className="w-5 h-5 text-[rgb(var(--brand-primary))]" />
            Upload Analysis Result
          </DialogTitle>
          <DialogDescription>
            Upload test results, lab reports, or any analysis documents for this appointment.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {!selectedFile ? (
            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              className="border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-lg p-8 text-center cursor-pointer hover:border-[rgb(var(--brand-primary))]/50 transition-colors"
              onClick={() => fileInputRef.current?.click()}
            >
              <div className="flex flex-col items-center gap-3">
                <div className="p-4 rounded-full bg-[rgb(var(--brand-primary))]/10">
                  <Upload className="w-8 h-8 text-[rgb(var(--brand-primary))]" />
                </div>
                <div>
                  <p className="font-medium text-slate-900 dark:text-slate-100">
                    Drop your file here or click to browse
                  </p>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                    Supports PDF, JPEG, PNG, DOCX (max 10MB)
                  </p>
                </div>
              </div>
              <Input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.jpg,.jpeg,.png,.docx"
                onChange={handleFileSelect}
                className="hidden"
              />
            </div>
          ) : (
            <div className="border border-slate-200 dark:border-slate-700 rounded-lg p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-[rgb(var(--brand-primary))]/10">
                  <FileText className="w-6 h-6 text-[rgb(var(--brand-primary))]" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-slate-900 dark:text-slate-100 truncate">
                    {selectedFile.file.name}
                  </p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    {formatFileSize(selectedFile.file.size)}
                  </p>
                </div>
                {!isUploading && !uploadSuccess && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={removeFile}
                    className="text-slate-500 hover:text-slate-700"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                )}
                {uploadSuccess && (
                  <CheckCircle2 className="w-6 h-6 text-[rgb(var(--status-success))]" />
                )}
              </div>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="notes" className="text-sm font-medium">
              Description (Optional)
            </Label>
            <Input
              id="notes"
              placeholder="Add a brief description of the results..."
              disabled={isUploading || uploadSuccess}
            />
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button
            variant="outline"
            onClick={() => {
              removeFile()
              onOpenChange(false)
            }}
            disabled={isUploading}
          >
            Cancel
          </Button>
          <Button
            onClick={handleUpload}
            disabled={!selectedFile || isUploading || uploadSuccess}
            className="bg-linear-to-r from-(--brand-gradient-from) to-(--brand-gradient-to) text-white"
          >
            {isUploading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Uploading...
              </>
            ) : uploadSuccess ? (
              <>
                <CheckCircle2 className="mr-2 h-4 w-4" />
                Uploaded!
              </>
            ) : (
              <>
                <Upload className="mr-2 h-4 w-4" />
                Upload File
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

