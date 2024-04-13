import { toBRL } from '@/lib/intl'
import { Info as InfoIcon } from 'lucide-react'

type Values = {
  [key: number]: number
}

type InfoProps =
  | {
      ticketsValues: Values
    }
  | {
      rewards: Values
    }

export function Info(props: InfoProps) {
  const title =
    'ticketsValues' in props ? 'VALORES BILHETES' : 'VALORES PRÊMIOS'
  const values = 'ticketsValues' in props ? props.ticketsValues : props.rewards

  return (
    <div className="flex items-center text-xs text-text-darker font-bold">
      <div className="flex items-center gap-2">
        <InfoIcon className="text-blue-400" />
        <strong>{title}</strong>
      </div>

      <RenderValues values={values} />
    </div>
  )
}
type RenderValuesProps = {
  values: Values
}

function RenderValues({ values }: RenderValuesProps) {
  return (
    <div className="space-x-2 divide-x-2 divide-text-darker">
      {Object.entries(values).map(([numbers, brl]) => (
        <strong key={numbers} className="pl-2">
          {numbers} NÚMEROS - {toBRL(brl)}
        </strong>
      ))}
    </div>
  )
}
