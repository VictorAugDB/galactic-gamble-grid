'use server'

import { NewTicket } from './contexts/NewTicketsContext'
import { revalidateTag } from 'next/cache'

export async function buyTickets(tickets: NewTicket[]) {
  for await (const ticket of tickets) {
    await fetch(`${process.env.API_URL}/tickets`, {
      method: 'POST',
      body: JSON.stringify({
        numbers: ticket.filledPositions,
      }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.JWT_TOKEN ?? ''}`,
      },
    })
  }

  revalidateTag('active-tickets')
}
