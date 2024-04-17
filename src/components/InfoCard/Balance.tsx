'use client'

import { useNewTickets } from '@/app/contexts/NewTicketsContext'
import { toBRL } from '@/lib/intl'

type BalanceProps = {
  balance: number
}

export function Balance({ balance }: BalanceProps) {
  const { totalCost } = useNewTickets()

  return (
    <div className="flex items-center gap-2">
      <strong
        data-is-positive={balance > 0}
        className="text-2xl text-red-600 data-[is-positive=true]:text-green-400"
      >
        {toBRL(balance)}
      </strong>
      {totalCost > 0 ? (
        <>
          -
          <strong
            data-is-positive={balance > 0}
            className="text-2xl text-red-600 "
          >
            {toBRL(totalCost)}
          </strong>
        </>
      ) : null}
      <img src="/images/add-money.svg" alt="add money" />
    </div>
  )
}
