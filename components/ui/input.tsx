import * as React from "react"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "bg-[#1a1a1a] border-[#1f1f1f] text-white placeholder:text-gray-600 h-9 w-full min-w-0 rounded-md border px-3 py-1 text-base outline-none disabled:pointer-events-none disabled:opacity-50 md:text-sm",
        "focus:border-[#8b5cf6] transition-colors",
        className
      )}
      {...props}
    />
  )
}

export { Input }
