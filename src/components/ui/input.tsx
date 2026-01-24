import * as React from "react"

import { cn } from "@/lib/utils"

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        style={{
          height: 'var(--input-height)',
          paddingLeft: 'var(--input-padding-x)',
          paddingRight: 'var(--input-padding-x)',
          paddingTop: 'var(--input-padding-y)',
          paddingBottom: 'var(--input-padding-y)',
          borderWidth: 'var(--input-border-width)',
          // borderColor: 'var(--input-border-color)',
          borderRadius: 'var(--input-border-radius)',
          backgroundColor: 'var(--input-bg)',
          fontSize: 'var(--input-text-size)',
        }}
        className={cn(
          "flex w-full transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground",
          "placeholder:text-muted-foreground",
          "focus-visible:outline-none",
          "disabled:cursor-not-allowed disabled:opacity-50",
          "aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
