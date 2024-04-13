import { cn } from '@/lib/utils'
import { VariantProps, cva } from 'class-variance-authority'
import { ComponentProps } from 'react'

const lotteryNumberVariants = cva(
  'rounded-full w-[30px] h-[30px] flex items-center justify-center font-bold text-white text-base',
  {
    variants: {
      variant: {
        default: 'bg-gray-800',
        orange: 'bg-orange-300',
        cyan: 'bg-cyan-400',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

type LotteryNumberProps = ComponentProps<'div'> &
  VariantProps<typeof lotteryNumberVariants> & {
    number: number
  }

export function LotteryNumber({
  className,
  variant,
  number,
  ...props
}: LotteryNumberProps) {
  return (
    <div
      className={cn(lotteryNumberVariants({ variant, className }))}
      {...props}
    >
      {number}
    </div>
  )
}
