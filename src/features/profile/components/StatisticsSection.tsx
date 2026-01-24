import { StatCard } from './StatCard'
import { PROFILE_STATS_CONFIG } from '../constants/stats-config'
import type { ProfileData } from '../types'

interface StatisticsSectionProps {
  statistics: ProfileData['statistics']
}

export function StatisticsSection({ statistics }: StatisticsSectionProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {PROFILE_STATS_CONFIG.map((stat) => (
        <StatCard
          key={stat.key}
          icon={stat.icon}
          label={stat.label}
          value={statistics[stat.key]}
          gradient={stat.gradient}
          prefix={stat.prefix}
        />
      ))}
    </div>
  )
}

