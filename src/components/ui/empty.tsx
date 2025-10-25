import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const emptyVariants = cva(
  "flex flex-col items-center justify-center text-center",
  {
    variants: {
      size: {
        sm: "py-8 px-4",
        md: "py-12 px-6", 
        lg: "py-16 px-8",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
)

export interface EmptyProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof emptyVariants> {
  icon?: React.ReactNode
  title?: string
  description?: string
  action?: React.ReactNode
}

const Empty = React.forwardRef<HTMLDivElement, EmptyProps>(
  ({ className, size, icon, title, description, action, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(emptyVariants({ size }), className)}
        {...props}
      >
        {icon && (
          <div className="mb-4 text-muted-foreground">
            {icon}
          </div>
        )}
        {title && (
          <h3 className="text-lg font-semibold text-foreground mb-2">
            {title}
          </h3>
        )}
        {description && (
          <p className="text-sm text-muted-foreground mb-4 max-w-sm">
            {description}
          </p>
        )}
        {action && (
          <div className="mt-2">
            {action}
          </div>
        )}
      </div>
    )
  }
)
Empty.displayName = "Empty"

export { Empty, emptyVariants }
