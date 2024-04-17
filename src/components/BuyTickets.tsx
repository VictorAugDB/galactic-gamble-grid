'use client'

import { useNewTickets } from '@/app/contexts/NewTicketsContext'
import { Button } from './Button'
import { buyTickets } from '@/app/actions'

export function BuyTickets() {
  const { newTickets, handlePurgeNewTickets } = useNewTickets()

  async function handleBuyTickets() {
    await buyTickets(newTickets)
    handlePurgeNewTickets()
  }

  return (
    <div className="flex items-center justify-center">
      <Button onClick={handleBuyTickets}>COMPRAR BILHETES</Button>
    </div>
  )
}
