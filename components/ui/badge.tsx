import type * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

// Update the badge variants to use black and white
const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-black text-white hover:bg-black/80",
        secondary: "border-transparent bg-[#333333] text-white hover:bg-[#333333]/80",
        destructive: "border-transparent bg-black text-white hover:bg-black/80",
        outline: "text-foreground border-black",
        success: "border-transparent bg-black/10 text-black border-black/20 hover:bg-black/20",
        warning: "border-transparent bg-black/10 text-black border-black/20 hover:bg-black/20",
        danger: "border-transparent bg-black/10 text-black border-black/20 hover:bg-black/20",
        info: "border-transparent bg-black/10 text-black border-black/20 hover:bg-black/20",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
)

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />
}

export { Badge, badgeVariants }
