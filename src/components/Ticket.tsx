'use client'

import { toBRL } from '@/lib/intl'
import { LotteryNumber } from './LotteryNumber'
import { ComponentProps } from 'react'
import { cn } from '@/lib/utils'
import { RandomTicket } from './RandomTicket'

export type TicketsProps = ComponentProps<'div'> & {
  newTicketId?: string
  filledPositions: number[] // array with N positions with 0s and 1s (0 means not filled) (1 means filled)
  idx?: number
  value: number
  reward?: number
  sortedNumbers?: Set<number>
}

export function Ticket({
  filledPositions,
  sortedNumbers,
  idx,
  value,
  newTicketId,
  className,
  reward,
  ...props
}: TicketsProps) {
  const numbers = Array.from(
    { length: filledPositions.length },
    (_, idx) => idx + 1,
  )
  const numberOfSelected = filledPositions.reduce(
    (acc, curr) => (curr ? acc + 1 : acc),
    0,
  )

  return (
    <div
      className={cn(
        'max-w-[15rem] py-3 border border-blue-400 relative',
        className,
      )}
      {...props}
    >
      <div className="flex pb-3 justify-between items-center border-b border-blue-400 border-dotted px-4 text-text-medium text-xs">
        <strong>
          {idx !== undefined ? `BILHETE#${idx + 1}` : 'Escolha os números'}
        </strong>
        <div className="truncate w-[6.75rem] text-end">
          <strong>
            Valor: <span className="text-green-400">{toBRL(value)}</span>
          </strong>
        </div>
      </div>
      <div
        id="ticket-icon"
        className="border border-dotted border-blue-400 rounded-full h-6 w-6 bg-background absolute flex items-center justify-center -translate-x-3 -translate-y-3"
      >
        <img src="/images/tickets.svg" alt="tickets" className="w-3.5 h-3.5" />
      </div>
      <div className="mt-4 space-y-4 px-7">
        <div className="flex items-center justify-between">
          <strong className="text-text-medium text-xs">
            Selecionados {numberOfSelected}
          </strong>

          {newTicketId ? <RandomTicket newTicketId={newTicketId} /> : null}

          {reward ? (
            <strong className="text-green-400 text-xs text-end">
              Recompensa {toBRL(reward)}
            </strong>
          ) : null}
        </div>
        <div className="flex gap-2 flex-wrap">
          {numbers.map((number, idx) => (
            <LotteryNumber
              key={number}
              number={number}
              variant={
                filledPositions[idx] && !sortedNumbers?.has(number)
                  ? 'orange'
                  : filledPositions[idx] && sortedNumbers?.has(number)
                    ? 'cyan'
                    : 'default'
              }
              newTicketId={newTicketId}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
