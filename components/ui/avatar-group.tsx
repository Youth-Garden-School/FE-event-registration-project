import * as React from "react"
import { cn } from "@/lib/utils"

interface AvatarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  max?: number
}

export function AvatarGroup({ children, className, max, ...props }: AvatarGroupProps) {
  const childrenArray = React.Children.toArray(children)
  const maxAvatars = max || childrenArray.length

  return (
    <div className={cn("flex -space-x-2", className)} {...props}>
      {childrenArray.slice(0, maxAvatars).map((child, index) => (
        <div key={index} className="relative">
          {child}
        </div>
      ))}
    </div>
  )
}

