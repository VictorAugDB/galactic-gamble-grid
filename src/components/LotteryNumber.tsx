'use client'

import { useNewTickets } from '@/app/contexts/NewTicketsContext'
import { cn } from '@/lib/utils'
import { VariantProps, cva } from 'class-variance-authority'
import { ComponentProps } from 'react'

const lotteryNumberVariants = cva(
  'rounded-full w-[30px] h-[30px] flex items-center justify-center font-bold text-white text-base data-[is-editable=true]:cursor-pointer',
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
  } & {
    newTicketId?: string
  }

export function LotteryNumber({
  className,
  variant,
  number,
  newTicketId,
  ...props
}: LotteryNumberProps) {
  const { newTickets, handleToogleNumber } = useNewTickets()

  const currTicket = newTicketId
    ? newTickets.find((nt) => nt.id === newTicketId)
    : null

  const currVariant =
    currTicket && currTicket.filledPositions[number - 1] === 0
      ? 'default'
      : variant

  return (
    <div
      onClick={() =>
        newTicketId ? handleToogleNumber(newTicketId, number) : () => {}
      }
      data-is-editable={!!newTicketId}
      className={cn(lotteryNumberVariants({ variant: currVariant, className }))}
      {...props}
    >
      {number}
    </div>
  )
}
