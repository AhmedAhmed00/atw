import { StatsCard } from './StatsCard'
import { StatsCardGridProps } from './types'
import { cn } from '@/lib/utils'

const gridColsMap: Record<number, string> = {
  1: 'grid-cols-1',
  2: 'grid-cols-2',
  3: 'grid-cols-3',
  4: 'grid-cols-4',
  5: 'grid-cols-5',
  6: 'grid-cols-6',
}

const smGridColsMap: Record<number, string> = {
  1: 'sm:grid-cols-1',
  2: 'sm:grid-cols-2',
  3: 'sm:grid-cols-3',
  4: 'sm:grid-cols-4',
  5: 'sm:grid-cols-5',
  6: 'sm:grid-cols-6',
}

const mdGridColsMap: Record<number, string> = {
  1: 'md:grid-cols-1',
  2: 'md:grid-cols-2',
  3: 'md:grid-cols-3',
  4: 'md:grid-cols-4',
  5: 'md:grid-cols-5',
  6: 'md:grid-cols-6',
}

const lgGridColsMap: Record<number, string> = {
  1: 'lg:grid-cols-1',
  2: 'lg:grid-cols-2',
  3: 'lg:grid-cols-3',
  4: 'lg:grid-cols-4',
  5: 'lg:grid-cols-5',
  6: 'lg:grid-cols-6',
}

const xlGridColsMap: Record<number, string> = {
  1: 'xl:grid-cols-1',
  2: 'xl:grid-cols-2',
  3: 'xl:grid-cols-3',
  4: 'xl:grid-cols-4',
  5: 'xl:grid-cols-5',
  6: 'xl:grid-cols-6',
}

export function StatsCardGrid({ 
  cards, 
  columns = { default: 1, md: 2, lg: 5 } 
}: StatsCardGridProps) {
  const gridClasses = cn(
    'grid gap-4',
    columns.default && gridColsMap[columns.default],
    columns.sm && smGridColsMap[columns.sm],
    columns.md && mdGridColsMap[columns.md],
    columns.lg && lgGridColsMap[columns.lg],
    columns.xl && xlGridColsMap[columns.xl]
  )

  return (
    <div className={gridClasses}>
      {cards.map((card, index) => (
        <StatsCard key={index} {...card} />
      ))}
    </div>
  )
}

