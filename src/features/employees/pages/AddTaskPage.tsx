/**
 * AddTaskPage Component
 * Full-page route for adding a new task
 */

import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { PageHeader } from '@/components/shared/page-header'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { ArrowLeft, Save, Plus, X, Paperclip } from 'lucide-react'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { cn } from '@/lib/utils'

const taskSchema = z.object({
  taskTitle: z.string().min(1, 'Task title is required'),
  assignedEmployee: z.string().min(1, 'Assigned employee is required'),
  relatedEmployee: z.string().optional(),
  taskSubject: z.string().optional(),
  dueDate: z.string().min(1, 'Due date is required'),
  priority: z.enum(['Low', 'Medium', 'High', 'Urgent']),
  category: z.string().min(1, 'Category is required'),
  description: z.string().optional(),
  checklistItems: z.array(z.string()).optional(),
  attachments: z.array(z.string()).optional(),
  sendNotification: z.boolean().optional(),
})

type TaskFormData = z.infer<typeof taskSchema>

// Mock employees for dropdowns
const mockEmployees = [
  { id: 'emp-001', name: 'Sarah Johnson' },
  { id: 'emp-002', name: 'Michael Chen' },
  { id: 'emp-003', name: 'Emily Rodriguez' },
  { id: 'emp-004', name: 'David Thompson' },
]

const categories = ['Training', 'Documentation', 'Maintenance', 'Review', 'Follow-up', 'Other']
const priorities = ['Low', 'Medium', 'High', 'Urgent']

export function AddTaskPage() {
  const navigate = useNavigate()
  const { employeeId } = useParams<{ employeeId: string }>()
  const [checklistItems, setChecklistItems] = useState<string[]>([''])
  const [attachments, setAttachments] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<TaskFormData>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      taskTitle: '',
      assignedEmployee: employeeId || '',
      relatedEmployee: '',
      taskSubject: '',
      dueDate: '',
      priority: 'Medium',
      category: '',
      description: '',
      checklistItems: [],
      attachments: [],
      sendNotification: false,
    },
  })

  const handleAddChecklistItem = () => {
    setChecklistItems([...checklistItems, ''])
  }

  const handleRemoveChecklistItem = (index: number) => {
    setChecklistItems(checklistItems.filter((_, i) => i !== index))
  }

  const handleChecklistItemChange = (index: number, value: string) => {
    const updated = [...checklistItems]
    updated[index] = value
    setChecklistItems(updated)
  }

  const handleAddAttachment = () => {
    // TODO: Implement file upload
    setAttachments([...attachments, ''])
  }

  const handleRemoveAttachment = (index: number) => {
    setAttachments(attachments.filter((_, i) => i !== index))
  }

  const handleSubmit = async (data: TaskFormData) => {
    setIsLoading(true)

    // Include checklist items and attachments
    const formData = {
      ...data,
      checklistItems: checklistItems.filter((item) => item.trim() !== ''),
      attachments,
    }

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // TODO: Submit to API
    console.log('Creating task:', formData)

    setIsLoading(false)
    if (employeeId) {
      navigate(`/employees/${employeeId}`)
    } else {
      navigate('/tasks')
    }
  }

  const handleCancel = () => {
    if (employeeId) {
      navigate(`/employees/${employeeId}`)
    } else {
      navigate('/tasks')
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <PageHeader
          title="Add New Task"
          description="Create a new task and assign it to an employee"
        />
        <Button
          variant="outline"
          size="icon"
          onClick={handleCancel}
          className="shrink-0 border-[#09B0B6] text-[#05647A] hover:bg-[#09B0B6]/10 hover:text-[#09B0B6] dark:hover:bg-[#09B0B6]/20 transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
        </Button>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Task Information</CardTitle>
              <CardDescription>Basic task details and assignment</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Task Title */}
              <FormField
                control={form.control}
                name="taskTitle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Task Title <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Enter task title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Assigned Employee */}
              <FormField
                control={form.control}
                name="assignedEmployee"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Assigned Employee <span className="text-red-500">*</span>
                    </FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select employee" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {mockEmployees.map((emp) => (
                          <SelectItem key={emp.id} value={emp.id}>
                            {emp.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Related Employee / Task Subject */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="relatedEmployee"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Related Employee</FormLabel>
                      <Select 
                        onValueChange={(value) => field.onChange(value === 'none' ? '' : value)} 
                        value={field.value || 'none'}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select employee (optional)" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="none">None</SelectItem>
                          {mockEmployees.map((emp) => (
                            <SelectItem key={emp.id} value={emp.id}>
                              {emp.name}
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
                  name="taskSubject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Task Subject</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter task subject (optional)" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Due Date, Priority, Category */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="dueDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Due Date <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="priority"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Priority <span className="text-red-500">*</span>
                      </FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {priorities.map((priority) => (
                            <SelectItem key={priority} value={priority}>
                              {priority}
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
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Category <span className="text-red-500">*</span>
                      </FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Description */}
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter task description (optional)"
                        rows={4}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {/* Checklist Items */}
          <Card>
            <CardHeader>
              <CardTitle>Checklist Items</CardTitle>
              <CardDescription>Add checklist items for this task (optional)</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {checklistItems.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Input
                    placeholder={`Checklist item ${index + 1}`}
                    value={item}
                    onChange={(e) => handleChecklistItemChange(index, e.target.value)}
                  />
                  {checklistItems.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemoveChecklistItem(index)}
                      className="shrink-0"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={handleAddChecklistItem}
                className="gap-2 w-full"
              >
                <Plus className="h-4 w-4" />
                Add Checklist Item
              </Button>
            </CardContent>
          </Card>

          {/* Attachments */}
          <Card>
            <CardHeader>
              <CardTitle>Attachments</CardTitle>
              <CardDescription>Add file attachments to this task (optional)</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {attachments.map((attachment, index) => (
                <div key={index} className="flex items-center gap-2 p-3 border rounded-lg">
                  <Paperclip className="w-4 h-4 text-muted-foreground" />
                  <span className="flex-1 text-sm text-muted-foreground">
                    {attachment || 'No file selected'}
                  </span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRemoveAttachment(index)}
                    className="shrink-0"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={handleAddAttachment}
                className="gap-2 w-full"
              >
                <Plus className="h-4 w-4" />
                Add Attachment
              </Button>
            </CardContent>
          </Card>

          {/* Send Notification */}
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <FormField
                control={form.control}
                name="sendNotification"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Send Notification</FormLabel>
                      <p className="text-sm text-muted-foreground">
                        Send a notification email to the assigned employee when this task is created
                      </p>
                    </div>
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="gap-2 bg-linear-to-r from-[#09B0B6] to-[#05647A] text-white hover:opacity-90"
            >
              <Save className="h-4 w-4" />
              {isLoading ? 'Creating...' : 'Create Task'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default AddTaskPage

