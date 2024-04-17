import { toBRL } from '@/lib/intl'
import { Balance } from './Balance'

type InfoCardProps = {
  numberOfActiveBets?: number
  balance?: number
  profit?: number
}

export function InfoCard({
  numberOfActiveBets,
  balance,
  profit,
}: InfoCardProps) {
  return (
    <div className="bg-card px-4 py-5 w-fit rounded-lg min-w-[13.9375rem] space-y-2">
      <div className="flex gap-3 items-center">
        <strong className="text-text-medium">
          {numberOfActiveBets ? 'APOSTAS ATIVAS' : balance ? 'SALDO' : 'LUCRO'}
        </strong>
        <img
          src={`/images/${numberOfActiveBets ? 'tickets.svg' : balance ? 'money.svg' : 'profit.svg'}`}
          alt=""
        />
      </div>
      {numberOfActiveBets ? (
        <span className="text-orange-300 font-bold text-2xl">
          {numberOfActiveBets}{' '}
          <span className="font-normal text-brown-400">ATIVAS</span>
        </span>
      ) : null}
      {balance ? <Balance balance={balance} /> : null}
      {profit ? (
        <strong
          data-is-positive={profit > 0}
          className="text-2xl block text-red-600 data-[is-positive=true]:text-green-400"
        >
          {toBRL(profit)}
        </strong>
      ) : null}
    </div>
  )
}
