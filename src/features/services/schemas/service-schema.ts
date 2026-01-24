import { z } from 'zod'

export const addServiceSchema = z.object({
  name: z
    .string()
    .min(3, 'Service name must be at least 3 characters')
    .max(100, 'Service name must not exceed 100 characters'),
  price: z
    .string()
    .min(1, 'Price is required')
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: 'Price must be a positive number',
    }),
  duration: z
    .string()
    .min(1, 'Duration is required')
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: 'Duration must be a positive number',
    }),
})

export type AddServiceFormInput = z.infer<typeof addServiceSchema>

// Type for the final service data with numbers
export interface AddServiceFormData {
  name: string
  price: number
  duration: number
}

