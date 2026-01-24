/**
 * Logo Section Component
 * Manages HCP logo upload and display
 */

import { useState, useRef } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { ImageIcon, Upload, Trash2, Loader2, CheckCircle2 } from 'lucide-react'

interface LogoSectionProps {
  currentLogo?: string
  onUpload: (file: File) => void
  onRemove: () => void
}

export function LogoSection({ currentLogo, onUpload, onRemove }: LogoSectionProps) {
  const [preview, setPreview] = useState<string | undefined>(currentLogo)
  const [isUploading, setIsUploading] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [dragActive, setDragActive] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      return
    }

    // Create preview
    const reader = new FileReader()
    reader.onload = (e) => {
      setPreview(e.target?.result as string)
    }
    reader.readAsDataURL(file)

    // Upload
    setIsUploading(true)
    setShowSuccess(false)
    // Simulate upload delay
    await new Promise((resolve) => setTimeout(resolve, 1000))
    onUpload(file)
    setIsUploading(false)
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 3000)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      handleFileSelect(file)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragActive(false)
    const file = e.dataTransfer.files?.[0]
    if (file) {
      handleFileSelect(file)
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setDragActive(true)
  }

  const handleDragLeave = () => {
    setDragActive(false)
  }

  const handleRemove = () => {
    setPreview(undefined)
    onRemove()
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl">
          <ImageIcon className="h-5 w-5 text-[rgb(var(--brand-primary))]" />
          HCP Logo
        </CardTitle>
        <CardDescription>
          Upload your healthcare provider's logo for branding
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {showSuccess && (
          <Alert className="border-green-500 bg-green-50 dark:bg-green-950/30">
            <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
            <AlertDescription className="text-green-800 dark:text-green-200">
              Logo uploaded successfully!
            </AlertDescription>
          </Alert>
        )}

        <div className="flex flex-col sm:flex-row gap-6 items-start">
          {/* Current Logo Preview */}
          <div className="flex-shrink-0">
            <div className="w-32 h-32 rounded-lg border-2 border-dashed border-slate-200 dark:border-slate-700 flex items-center justify-center bg-slate-50 dark:bg-slate-800/50 overflow-hidden">
              {preview ? (
                <img
                  src={preview}
                  alt="HCP Logo"
                  className="w-full h-full object-contain p-2"
                />
              ) : (
                <ImageIcon className="h-10 w-10 text-slate-300 dark:text-slate-600" />
              )}
            </div>
          </div>

          {/* Upload Area */}
          <div className="flex-1 w-full">
            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onClick={() => fileInputRef.current?.click()}
              className={`
                border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-all
                ${
                  dragActive
                    ? 'border-[rgb(var(--brand-primary))] bg-[rgb(var(--brand-primary))]/5'
                    : 'border-slate-200 dark:border-slate-700 hover:border-[rgb(var(--brand-primary))]/50'
                }
              `}
            >
              <div className="flex flex-col items-center gap-2">
                {isUploading ? (
                  <Loader2 className="h-8 w-8 text-[rgb(var(--brand-primary))] animate-spin" />
                ) : (
                  <Upload className="h-8 w-8 text-[rgb(var(--brand-primary))]" />
                )}
                <div>
                  <p className="font-medium text-slate-900 dark:text-slate-100">
                    {isUploading ? 'Uploading...' : 'Drop your logo here or click to browse'}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    PNG, JPG or SVG (max. 2MB, recommended 512x512px)
                  </p>
                </div>
              </div>
              <Input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleInputChange}
                className="hidden"
              />
            </div>

            {preview && (
              <div className="mt-4 flex justify-end">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleRemove}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Remove Logo
                </Button>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

