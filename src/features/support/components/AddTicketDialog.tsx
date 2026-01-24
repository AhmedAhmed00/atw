/**
 * Add Ticket Dialog Component
 * Allows creating a new support ticket
 */

import { useState, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { TicketPlus, Loader2, Upload, X, FileText, ImageIcon, File } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { TicketType, SupportTicket } from '../types'
import { TICKET_TYPE_CONFIG } from '../types'

const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB
const ACCEPTED_FILE_TYPES = [
  'image/jpeg',
  'image/png',
  'image/gif',
  'image/webp',
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'text/plain',
]

const ticketFormSchema = z.object({
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  description: z.string().min(20, 'Description must be at least 20 characters'),
  ticketType: z.enum(['technical', 'billing', 'appointment', 'general', 'feedback', 'complaint'] as const, {
    required_error: 'Please select a ticket type',
  }),
})

type TicketFormValues = z.infer<typeof ticketFormSchema>

interface AttachmentFile {
  id: string
  file: File
  preview?: string
}

interface AddTicketDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onAddTicket: (ticket: Partial<SupportTicket>, attachments: File[]) => void
}

function getFileIcon(fileType: string) {
  if (fileType.startsWith('image/')) {
    return <ImageIcon className="h-4 w-4" />
  }
  if (fileType === 'application/pdf') {
    return <FileText className="h-4 w-4" />
  }
  return <File className="h-4 w-4" />
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return bytes + ' B'
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
}

export function AddTicketDialog({ open, onOpenChange, onAddTicket }: AddTicketDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [attachments, setAttachments] = useState<AttachmentFile[]>([])
  const [dragActive, setDragActive] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const form = useForm<TicketFormValues>({
    resolver: zodResolver(ticketFormSchema),
    defaultValues: {
      subject: '',
      description: '',
      ticketType: undefined,
    },
  })

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    const files = Array.from(e.dataTransfer.files)
    handleFiles(files)
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files)
      handleFiles(files)
    }
  }

  const handleFiles = (files: File[]) => {
    const validFiles = files.filter((file) => {
      if (!ACCEPTED_FILE_TYPES.includes(file.type)) {
        console.warn(`File type ${file.type} not accepted`)
        return false
      }
      if (file.size > MAX_FILE_SIZE) {
        console.warn(`File ${file.name} exceeds max size`)
        return false
      }
      return true
    })

    const newAttachments: AttachmentFile[] = validFiles.map((file) => ({
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      file,
      preview: file.type.startsWith('image/') ? URL.createObjectURL(file) : undefined,
    }))

    setAttachments((prev) => [...prev, ...newAttachments])
  }

  const removeAttachment = (id: string) => {
    setAttachments((prev) => {
      const toRemove = prev.find((a) => a.id === id)
      if (toRemove?.preview) {
        URL.revokeObjectURL(toRemove.preview)
      }
      return prev.filter((a) => a.id !== id)
    })
  }

  const handleSubmit = async (values: TicketFormValues) => {
    setIsSubmitting(true)
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const newTicket: Partial<SupportTicket> = {
      subject: values.subject,
      description: values.description,
      ticketType: values.ticketType,
      status: 'open',
      priority: 'medium',
    }

    onAddTicket(newTicket, attachments.map((a) => a.file))
    
    // Cleanup
    attachments.forEach((a) => {
      if (a.preview) URL.revokeObjectURL(a.preview)
    })
    setAttachments([])
    form.reset()
    setIsSubmitting(false)
    onOpenChange(false)
  }

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      // Cleanup on close
      attachments.forEach((a) => {
        if (a.preview) URL.revokeObjectURL(a.preview)
      })
      setAttachments([])
      form.reset()
    }
    onOpenChange(isOpen)
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[550px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <TicketPlus className="w-5 h-5 text-[rgb(var(--brand-primary))]" />
            Create Support Ticket
          </DialogTitle>
          <DialogDescription>
            Fill in the details below to create a new support ticket.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subject</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Brief summary of your issue"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="ticketType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ticket Type</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select ticket type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {(Object.keys(TICKET_TYPE_CONFIG) as TicketType[]).map((type) => (
                        <SelectItem key={type} value={type}>
                          <div className="flex items-center gap-2">
                            <span
                              className={cn(
                                'w-2 h-2 rounded-full',
                                type === 'technical' && 'bg-violet-500',
                                type === 'billing' && 'bg-emerald-500',
                                type === 'appointment' && 'bg-blue-500',
                                type === 'general' && 'bg-slate-500',
                                type === 'feedback' && 'bg-amber-500',
                                type === 'complaint' && 'bg-rose-500'
                              )}
                            />
                            {TICKET_TYPE_CONFIG[type].label}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Provide a detailed description of your issue..."
                      rows={5}
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Attachments */}
            <div className="space-y-2">
              <Label>Attachments</Label>
              <div
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                className={cn(
                  'border-2 border-dashed rounded-lg p-4 transition-colors cursor-pointer',
                  dragActive
                    ? 'border-[rgb(var(--brand-primary))] bg-[rgb(var(--brand-primary))]/5'
                    : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
                )}
                onClick={() => fileInputRef.current?.click()}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept={ACCEPTED_FILE_TYPES.join(',')}
                  onChange={handleFileSelect}
                  className="hidden"
                />
                <div className="flex flex-col items-center gap-2 text-center">
                  <div className="p-2 rounded-full bg-slate-100 dark:bg-slate-800">
                    <Upload className="h-5 w-5 text-slate-500" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      Drop files here or click to upload
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Images, PDFs, documents up to 10MB
                    </p>
                  </div>
                </div>
              </div>

              {/* Attachment List */}
              {attachments.length > 0 && (
                <div className="space-y-2 mt-3">
                  {attachments.map((attachment) => (
                    <div
                      key={attachment.id}
                      className="flex items-center gap-3 p-2 border border-slate-200 dark:border-slate-700 rounded-lg"
                    >
                      {attachment.preview ? (
                        <img
                          src={attachment.preview}
                          alt={attachment.file.name}
                          className="w-10 h-10 rounded object-cover"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                          {getFileIcon(attachment.file.type)}
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">
                          {attachment.file.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {formatFileSize(attachment.file.size)}
                        </p>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-slate-400 hover:text-rose-500"
                        onClick={(e) => {
                          e.stopPropagation()
                          removeAttachment(attachment.id)
                        }}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <DialogFooter className="pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => handleOpenChange(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-linear-to-r from-(--brand-gradient-from) to-(--brand-gradient-to) text-white"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating...
                  </>
                ) : (
                  <>
                    <TicketPlus className="mr-2 h-4 w-4" />
                    Create Ticket
                  </>
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

