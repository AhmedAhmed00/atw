import { z } from 'zod'

export const swapRequestSchema = z.object({
  employeeId: z.string().min(1, 'Please select an employee'),
  currentShiftId: z.string().min(1, 'Please select a current shift'),
  proposedDate: z.string().min(1, 'Proposed date is required'),
  proposedStartTime: z.string().min(1, 'Proposed start time is required'),
  proposedEndTime: z.string().min(1, 'Proposed end time is required'),
  reason: z.string().min(10, 'Reason must be at least 10 characters'),
})

export type SwapRequestFormValues = z.infer<typeof swapRequestSchema>

