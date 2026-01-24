import { Landmark, CreditCard, Percent, FileText, Lock } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { ProfileData } from "../types"

interface FinancialSectionProps {
  profile: ProfileData
}

export function FinancialSection({ profile }: FinancialSectionProps) {
  return (
    <Card className="relative overflow-hidden border-t-4 border-t-emerald-500 shadow-lg hover:shadow-xl transition-shadow duration-300">
      {/* Decorative background */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-linear-to-br from-emerald-400 to-teal-400 opacity-5 rounded-full blur-3xl -translate-y-32 -translate-x-32" />
      
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-linear-to-br from-emerald-500 to-teal-500 shadow-lg shadow-emerald-500/30 flex items-center justify-center">
              <Landmark className="w-6 h-6 text-white" />
            </div>
            <CardTitle className="text-2xl bg-linear-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">
              Financial Information
            </CardTitle>
          </div>
          <Badge className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 border-emerald-300 dark:border-emerald-700 flex items-center gap-1">
            <Lock className="w-3 h-3" />
            Secure
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Bank Account Name */}
          <div className="relative group">
            <div className="absolute inset-0 bg-linear-to-br from-slate-100 to-slate-50 dark:from-slate-800 dark:to-slate-900 rounded-xl opacity-50 group-hover:opacity-100 transition-opacity" />
            <div className="relative p-5 space-y-3 rounded-xl border-2 border-slate-200 dark:border-slate-700 hover:border-emerald-300 dark:hover:border-emerald-600 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-linear-to-br from-blue-500 to-blue-600 shadow-md flex items-center justify-center">
                  <CreditCard className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                    Account Name
                  </p>
                  <p className="text-sm font-bold text-slate-900 dark:text-slate-100 mt-1">
                    {profile.bankAccountName}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Bank Account Number */}
          <div className="relative group">
            <div className="absolute inset-0 bg-linear-to-br from-slate-100 to-slate-50 dark:from-slate-800 dark:to-slate-900 rounded-xl opacity-50 group-hover:opacity-100 transition-opacity" />
            <div className="relative p-5 space-y-3 rounded-xl border-2 border-slate-200 dark:border-slate-700 hover:border-emerald-300 dark:hover:border-emerald-600 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-linear-to-br from-[#3DCCD0] to-[#09B0B6] shadow-md flex items-center justify-center">
                  <Lock className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                    Account Number
                  </p>
                  <p className="text-sm font-bold text-slate-900 dark:text-slate-100 mt-1 font-mono tracking-wider">
                    {profile.bankAccount}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Commission Rate */}
          <div className="relative group">
            <div className="absolute inset-0 bg-linear-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30 rounded-xl opacity-70 group-hover:opacity-100 transition-opacity" />
            <div className="relative p-5 space-y-3 rounded-xl border-2 border-emerald-200 dark:border-emerald-800 hover:border-emerald-400 dark:hover:border-emerald-600 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-linear-to-br from-emerald-500 to-teal-500 shadow-md flex items-center justify-center">
                  <Percent className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                    Commission Rate
                  </p>
                  <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mt-1">
                    {profile.commissionRate}%
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Terms */}
          <div className="relative group">
            <div className="absolute inset-0 bg-linear-to-br from-[#63A7D8]/20 to-[#AADCF7]/20 dark:from-[#63A7D8]/30 dark:to-[#AADCF7]/30 rounded-xl opacity-70 group-hover:opacity-100 transition-opacity" />
            <div className="relative p-5 space-y-3 rounded-xl border-2 border-[#63A7D8]/40 dark:border-[#63A7D8]/50 hover:border-[#63A7D8]/60 dark:hover:border-[#63A7D8]/70 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-linear-to-br from-[#63A7D8] to-[#266BAC] shadow-md flex items-center justify-center">
                  <FileText className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                    Payment Terms
                  </p>
                  <p className="text-sm font-bold text-slate-900 dark:text-slate-100 mt-1">
                    {profile.paymentTerms}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Security Notice */}
        <div className="mt-6 p-4 rounded-lg bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800">
          <div className="flex items-start gap-3">
            <Lock className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-emerald-800 dark:text-emerald-300">
                Financial information is encrypted and secure
              </p>
              <p className="text-xs text-emerald-600 dark:text-emerald-500 mt-1">
                Your banking details are protected with industry-standard encryption
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

