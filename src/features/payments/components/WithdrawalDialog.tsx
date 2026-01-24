import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { InfoIcon, Building2 } from 'lucide-react'
import { BankAccount } from '../types'

const withdrawalFormSchema = z.object({
  amount: z.string()
    .min(1, 'Amount is required')
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: 'Amount must be a positive number',
    }),
  bankAccountId: z.string()
    .min(1, 'Please select a bank account'),
  notes: z.string().optional(),
})

type WithdrawalFormValues = z.infer<typeof withdrawalFormSchema>

interface WithdrawalDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (data: { amount: number; bankAccountId: string; notes?: string }) => void
  availableBalance: number
  bankAccounts: BankAccount[]
}

export function WithdrawalDialog({
  open,
  onOpenChange,
  onSubmit,
  availableBalance,
  bankAccounts,
}: WithdrawalDialogProps) {
  // Find default account
  const defaultAccount = bankAccounts.find(acc => acc.isDefault)
  
  const form = useForm<WithdrawalFormValues>({
    resolver: zodResolver(withdrawalFormSchema),
    defaultValues: {
      amount: '',
      bankAccountId: defaultAccount?.id || '',
      notes: '',
    },
  })

  const handleSubmit = (data: WithdrawalFormValues) => {
    const amount = Number(data.amount)
    
    if (amount > availableBalance) {
      form.setError('amount', {
        message: `Amount cannot exceed available balance ($${availableBalance.toFixed(2)})`,
      })
      return
    }

    onSubmit({
      amount,
      bankAccountId: data.bankAccountId,
      notes: data.notes,
    })
    form.reset()
  }

  const handleClose = () => {
    form.reset()
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-2xl bg-linear-to-r from-(--brand-gradient-from) to-(--brand-gradient-to) bg-clip-text text-transparent">
            New Withdrawal Request
          </DialogTitle>
          <DialogDescription>
            Request a withdrawal from your available balance. Processing typically takes 2-3 business days.
          </DialogDescription>
        </DialogHeader>

        <Alert className="bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800">
          <InfoIcon className="h-4 w-4 text-blue-600 dark:text-blue-400" />
          <AlertDescription className="text-blue-800 dark:text-blue-300 text-sm">
            Available Balance: <span className="font-bold">${availableBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
          </AlertDescription>
        </Alert>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount ($)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      {...field}
                      className="text-lg"
                    />
                  </FormControl>
                  <FormDescription>
                    Enter the amount you wish to withdraw
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="bankAccountId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bank Account</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="w-full ">
                        <SelectValue placeholder="Select a bank account" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {bankAccounts.map((account) => (
                        <SelectItem key={account.id} value={account.id}>
                          <div className="flex items-center gap-3">
                            <Building2 className="h-6 w-6 text-muted-foreground" />
                            <div className="flex items-center gap-2">
                              <span className="font-medium text-[14px]">{account.bankName}</span>
                              <span className="text-xs text-muted-foreground">
                                {account.accountType === 'checking' ? 'Checking' : 'Savings'} • {account.accountNumber}
                                {account.isDefault && (
                                  <span className="ml-2 text-[rgb(var(--brand-primary))]">• Default</span>
                                )}
                              </span>
                            </div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Select the bank account for this withdrawal
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />


            {/* Notes Field is commented out untill i check the business requirements */}
            
             {/* 
            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Notes (Optional)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Add any additional notes..."
                      className="resize-none"
                      rows={3}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Optional notes about this withdrawal
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            /> 
            */}

            <div className="flex justify-end gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={handleClose}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-linear-to-r from-(--brand-gradient-from) to-(--brand-gradient-to) hover:opacity-90"
              >
                Submit Request
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

