import { Children, ReactElement, cloneElement } from 'react'
import { cn } from '@/lib/utils'

interface AvatarGroupProps {
  children: ReactElement[]
  max?: number
  className?: string
}

export function AvatarGroup({ children, max = 3, className }: AvatarGroupProps) {
  const childrenArray = Children.toArray(children) as ReactElement[]
  const visibleChildren = childrenArray.slice(0, max)
  const remaining = childrenArray.length - max

  return (
    <div className={cn('flex -space-x-2', className)}>
      {visibleChildren.map((child, index) => {
        const childClassName = typeof child.props === 'object' && child.props !== null && 'className' in child.props 
          ? child.props.className as string 
          : ''
        
        return cloneElement(child, {
          className: cn(childClassName, 'ring-2 ring-background'),
          key: child.key || index,
        } as Record<string, unknown>)
      })}
      {remaining > 0 && (
        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-muted text-xs font-medium ring-2 ring-background">
          +{remaining}
        </div>
      )}
    </div>
  )
}

