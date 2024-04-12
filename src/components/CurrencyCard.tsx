import { toBRL } from '@/lib/intl'

type CurrencyCardProps = {
  numberOfActiveBets?: number
  balance?: number
  profit?: number
}

export function CurrencyCard({
  numberOfActiveBets,
  balance,
  profit,
}: CurrencyCardProps) {
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
      {balance ? (
        <div className="flex items-center gap-2">
          <strong
            data-is-positive={balance > 0}
            className="text-2xl text-red-600 data-[is-positive=true]:text-green-400"
          >
            {toBRL(balance)}
          </strong>
          <img src="/images/add-money.svg" alt="add money" />
        </div>
      ) : null}
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
