import { fetchAPI } from '@/utils/fetchAPI'

type Res = {
  balance: number
}

export async function getUserBalance() {
  const { balance } = await fetchAPI<Res>({
    path: '/balance',
    token: process.env.JWT_TOKEN ?? '',
    options: {
      next: {
        tags: ['active-tickets', 'bets', 'balance'],
      },
    },
  })

  return balance
}
