import { Shield, Award, GraduationCap, CheckCircle2 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { ProfileData } from "../types"

interface ProfessionalSectionProps {
  profile: ProfileData
}

export function ProfessionalSection({ profile }: ProfessionalSectionProps) {
  return (
    <Card className="relative overflow-hidden border-t-4 border-t-[rgb(var(--brand-primary))] shadow-lg hover:shadow-xl transition-shadow duration-300">
      {/* Decorative background */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-linear-to-br from-(--brand-gradient-from) to-(--brand-gradient-to) opacity-5 rounded-full blur-3xl -translate-y-32 translate-x-32" />
      
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-linear-to-br from-(--brand-gradient-from) to-(--brand-gradient-to) shadow-lg shadow-[rgb(var(--brand-primary))]/30 flex items-center justify-center">
            <GraduationCap className="w-6 h-6 text-white" />
          </div>
          <CardTitle className="text-2xl bg-linear-to-r from-(--brand-gradient-from) to-(--brand-gradient-to) bg-clip-text text-transparent">
            Professional Information
          </CardTitle>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* License Info */}
        <div className="flex items-start gap-4 p-4 rounded-xl bg-linear-to-br from-slate-50 to-slate-100 dark:from-slate-800/50 dark:to-slate-900/50 border border-slate-200 dark:border-slate-700">
          <div className="shrink-0 w-10 h-10 rounded-lg bg-linear-to-br from-[#09B0B6] to-[#05647A] shadow-md flex items-center justify-center">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">
              License Number
            </p>
            <p className="text-lg font-bold text-[rgb(var(--brand-secondary))] dark:text-[rgb(var(--brand-primary))] font-mono">
              {profile.licenseNumber}
            </p>
          </div>
          <Badge className="bg-[#09B0B6]/10 text-[#05647A] dark:bg-[#09B0B6]/20 dark:text-[#09B0B6] border-[#09B0B6]/30 dark:border-[#09B0B6]/40">
            <CheckCircle2 className="w-3 h-3 mr-1" />
            Verified
          </Badge>
        </div>

        {/* Years of Experience */}
        <div className="flex items-start gap-4 p-4 rounded-xl bg-linear-to-br from-[#E0F4F7] to-[#D4EEF8] dark:from-[#0F2730]/30 dark:to-[#0A1C28]/30 border border-[#09B0B6]/20 dark:border-[#09B0B6]/30">
          <div className="shrink-0 w-10 h-10 rounded-lg bg-linear-to-br from-[#05647A] to-[#09B0B6] shadow-md flex items-center justify-center">
            <Award className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">
              Years of Experience
            </p>
            <p className="text-lg font-bold text-[#05647A] dark:text-[#09B0B6]">
              {profile.yearsOfExperience} Years
            </p>
          </div>
        </div>

        {/* Certifications */}
        {profile.certifications && profile.certifications.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-1 h-6 bg-linear-to-b from-(--brand-gradient-from) to-(--brand-gradient-to) rounded-full" />
              <h3 className="text-lg font-semibold text-[rgb(var(--brand-secondary))] dark:text-[rgb(var(--brand-primary))]">
                Certifications & Credentials
              </h3>
            </div>
            <div className="space-y-2 pl-4">
              {profile.certifications.map((cert, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-[rgb(var(--brand-primary))]/50 transition-all duration-300 group"
                >
                  <CheckCircle2 className="w-5 h-5 shrink-0 text-[rgb(var(--brand-primary))] mt-0.5 group-hover:scale-110 transition-transform" />
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    {cert}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

