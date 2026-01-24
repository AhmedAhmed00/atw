import { ProfileHeader } from "./components/ProfileHeader"
import { StatisticsSection } from "./components/StatisticsSection"
import { ProfessionalSection } from "./components/ProfessionalSection"
import { FinancialSection } from "./components/FinancialSection"
import { mockProfileData } from "./data/mockProfile"

export default function ProfilePage() {
  return (
    <div className="space-y-8  ">
      {/* Hero Header */}
      <ProfileHeader profile={mockProfileData} />
      {/* Practice Statistics */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-1.5 h-8 bg-linear-to-b from-(--brand-gradient-from) to-(--brand-gradient-to) rounded-full" />
          <h2 className="text-2xl font-bold text-[rgb(var(--brand-secondary))] dark:text-[rgb(var(--brand-primary))]">
            Practice Statistics
          </h2>
        </div>
        <StatisticsSection statistics={mockProfileData.statistics} />
      </div>

      {/* Professional & Financial Info Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <ProfessionalSection profile={mockProfileData} />
        <FinancialSection profile={mockProfileData} />
      </div>
    </div>
  )
}

