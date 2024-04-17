'use client'

import { useNewTickets } from '@/app/contexts/NewTicketsContext'

export function AddTicket() {
  const { handleAddNewTicket } = useNewTickets()

  return (
    <>
      <img
        onClick={handleAddNewTicket}
        className="hover:scale-110 transition-transform duration-300 cursor-pointer"
        src="/images/add_ticket.png"
        alt="add ticket"
      />
    </>
  )
}
