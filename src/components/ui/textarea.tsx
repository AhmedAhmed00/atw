import * as React from "react"

import { cn } from "@/lib/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      style={{
        minHeight: '4rem',
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
        "flex field-sizing-content w-full shadow-xs transition-[color,box-shadow] outline-none",
        "placeholder:text-muted-foreground",
        "aria-invalid:border-red-500 dark:aria-invalid:border-red-500",
        "aria-invalid:ring-red-500/20 dark:aria-invalid:ring-red-500/40",
        "aria-invalid:focus-visible:border-red-500 aria-invalid:focus-visible:ring-red-500/20",
        "dark:bg-input/30",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
