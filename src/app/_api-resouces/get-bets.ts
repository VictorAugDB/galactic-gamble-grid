import { Bet } from '@/components/ResultsTable'
import { fetchAPI } from '@/utils/fetchAPI'

type Res = {
  bets: Bet[]
}

export async function getBets() {
  const { bets } = await fetchAPI<Res>({
    path: `/bets?page=${1}&size=${100}`,
    token: process.env.JWT_TOKEN,
    options: {
      next: {
        tags: ['bets'],
      },
    },
  })

  return bets
}
