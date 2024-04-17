import { fetchAPI } from '@/utils/fetchAPI'

type Ticket = {
  id: string
  numbers: number[]
}

type Res = {
  tickets: Ticket[]
}

export async function getActiveTickets() {
  const { tickets } = await fetchAPI<Res>({
    path: '/tickets',
    token: process.env.JWT_TOKEN ?? '',
    options: {
      next: {
        tags: ['active-tickets'],
      },
    },
  })

  return tickets
}
