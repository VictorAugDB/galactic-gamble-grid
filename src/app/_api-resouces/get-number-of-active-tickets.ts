import { fetchAPI } from '@/utils/fetchAPI'

type Res = {
  count: number
}

export async function getNumberOfActiveTickets() {
  const { count } = await fetchAPI<Res>({
    path: '/tickets/count',
    token: process.env.JWT_TOKEN ?? '',
    options: {
      next: {
        tags: ['active-tickets', 'bets'],
      },
    },
  })

  return count
}
