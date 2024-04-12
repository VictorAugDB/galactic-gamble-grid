import { toBRL } from '@/lib/intl'
import { Info } from 'lucide-react'

type TicketsValues = {
  [key: number]: number
}

type TicketsValuesInfo = {
  ticketsValues: TicketsValues
}

export function TicketsValuesInfo({ ticketsValues }: TicketsValuesInfo) {
  return (
    <div className="flex items-center text-xs text-text-darker font-bold">
      <div className="flex items-center gap-2">
        <Info className="text-blue-400" />
        <strong>VALORES BILHETES:</strong>
      </div>

      <div className="space-x-2 divide-x-2 divide-text-darker">
        {Object.entries(ticketsValues).map(([numbers, brl]) => (
          <strong key={numbers} className="pl-2">
            {numbers} NÚMEROS - {toBRL(brl)}
          </strong>
        ))}
      </div>
    </div>
  )
}
