import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        'darker-blue': 'bg-blue-700 hover:bg-blue-700/80',
        'lighter-blue': 'bg-blue-500 hover:bg-blue-500/80 text-lg font-bold',
        orange: 'bg-orange-400 hover:bg-orange-400/80',
      },
      size: {
        default: 'h-[4.0625rem] rounded-lg px-10 py-5',
        sm: 'h-12 rounded-2xl px-4 py-3',
      },
    },
    defaultVariants: {
      variant: 'lighter-blue',
      size: 'default',
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  },
)
Button.displayName = 'Button'

export { Button, buttonVariants }
