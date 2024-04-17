'use server'

import { fetchAPI } from '@/utils/fetchAPI'
import { NewTicket } from './contexts/NewTicketsContext'
import { revalidateTag } from 'next/cache'

export async function buyTickets(tickets: NewTicket[]) {
  for await (const ticket of tickets) {
    await fetchAPI({
      path: '/tickets',
      options: {
        method: 'POST',
        body: JSON.stringify({
          numbers: ticket.filledPositions,
        }),
      },
      token: process.env.JWT_TOKEN,
    })
  }

  revalidateTag('active-tickets')
}

export async function addMoney(amount: number) {
  await fetchAPI({
    path: '/add-money',
    token: process.env.JWT_TOKEN,
    options: {
      method: 'POST',
      body: JSON.stringify({
        value: amount,
      }),
    },
  })
  revalidateTag('balance')
}

type WinningTickets = {
  id: string
  value: number
  numbers: number[]
}

export type SortBetRes = {
  sortedNumbers: number[]
  winningTickets: WinningTickets[]
  betId: string
}

export async function sortBet() {
  const res = await fetchAPI<SortBetRes>({
    path: '/bets',
    token: process.env.JWT_TOKEN,
    options: {
      method: 'POST',
      body: JSON.stringify({}),
    },
  })

  revalidateTag('bets')

  return res
}
