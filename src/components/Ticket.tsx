import { toBRL } from '@/lib/intl'
import { LotteryNumber } from './LotteryNumber'
import { ComponentProps } from 'react'
import { cn } from '@/lib/utils'

type TicketsProps = ComponentProps<'div'> & {
  filledPositions: number[] // array with N positions with 0s and 1s (0 means not filled) (1 means filled)
  idx: number
  value: number
}

export function Ticket({
  filledPositions,
  idx,
  value,
  className,
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
        <strong>BILHETE#{idx}</strong>
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
        <strong className="text-text-medium text-xs">
          Selecionados {numberOfSelected}
        </strong>
        <div className="flex gap-2 flex-wrap">
          {numbers.map((number, idx) => (
            <LotteryNumber
              key={number}
              number={number}
              variant={filledPositions[idx] ? 'orange' : 'default'}
            />
          ))}
        </div>
      </div>
    </div>
  )
}