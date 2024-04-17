import { fetchAPI } from '@/utils/fetchAPI'

type Res = {
  profit: number
}

export async function getUserProfit() {
  const { profit } = await fetchAPI<Res>({
    path: '/profit',
    token: process.env.JWT_TOKEN ?? '',
    options: {
      next: {
        tags: ['bets'],
      },
    },
  })

  return profit
}
