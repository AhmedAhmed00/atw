import { Mail, Phone, MapPin, Award, Stethoscope, Sparkles } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { ProfileData } from "../types"

interface ProfileHeaderProps {
  profile: ProfileData
}

export function ProfileHeader({ profile }: ProfileHeaderProps) {
  return (
    <Card className="relative overflow-hidden border-none shadow-2xl">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-linear-to-br from-(--brand-gradient-from) to-(--brand-gradient-to) opacity-90" />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNiIgc3Ryb2tlPSJyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMSkiIHN0cm9rZS13aWR0aD0iMiIvPjwvZz48L3N2Zz4=')] opacity-20" />
      
      <CardContent className="relative p-8">
        <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
          {/* Avatar with animated ring */}
          <div className="relative shrink-0 group">
            <div className="absolute inset-0 bg-white/30 rounded-full blur-2xl animate-pulse" />
            <div className="relative w-32 h-32 rounded-full bg-white/20 backdrop-blur-md border-4 border-white/40 shadow-2xl overflow-hidden">
              <div className="w-full h-full flex items-center justify-center bg-white/10">
                <span className="text-5xl font-bold text-white">
                  {profile.fullName.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
            </div>
            <div className="absolute -bottom-2 -right-2 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center">
              <Stethoscope className="w-6 h-6 text-[rgb(var(--brand-primary))]" />
            </div>
          </div>

          {/* Info Section */}
          <div className="flex-1 space-y-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-4xl font-bold text-white drop-shadow-lg">
                    {profile.fullName}
                  </h1>
                  <Sparkles className="w-6 h-6 text-yellow-300 animate-pulse" />
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <Badge className="bg-white/20 backdrop-blur-sm text-white border-white/40 hover:bg-white/30 px-4 py-1.5 text-sm font-medium shadow-lg">
                    <Award className="w-4 h-4 mr-2" />
                    {profile.serviceProviderType}
                  </Badge>
                  <Badge className="bg-white/20 backdrop-blur-sm text-white border-white/40 hover:bg-white/30 px-4 py-1.5 text-sm font-medium shadow-lg">
                    {profile.specialization}
                  </Badge>
                  <Badge className="bg-yellow-400/90 backdrop-blur-sm text-slate-900 border-yellow-300 hover:bg-yellow-300 px-4 py-1.5 text-sm font-bold shadow-lg">
                    {profile.yearsOfExperience} Years Experience
                  </Badge>
                </div>
              </div>
            </div>

            {profile.bio && (
              <p className="text-white/90 text-lg leading-relaxed max-w-3xl drop-shadow">
                {profile.bio}
              </p>
            )}

            {/* Quick Contact Info */}
            <div className="flex flex-wrap gap-6 pt-2">
              <div className="flex items-center gap-2 text-white/90">
                <div className="w-8 h-8 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <Mail className="w-4 h-4" />
                </div>
                <span className="text-sm font-medium">{profile.email}</span>
              </div>
              <div className="flex items-center gap-2 text-white/90">
                <div className="w-8 h-8 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <Phone className="w-4 h-4" />
                </div>
                <span className="text-sm font-medium">{profile.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-white/90">
                <div className="w-8 h-8 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <MapPin className="w-4 h-4" />
                </div>
                <span className="text-sm font-medium">{profile.address}</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

