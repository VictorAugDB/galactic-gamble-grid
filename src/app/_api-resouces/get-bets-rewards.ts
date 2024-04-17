import { fetchAPI } from '@/utils/fetchAPI'

export type BetsRewards = { [key: string]: number }

type Res = {
  betsRewards: BetsRewards
}

export async function getBetsRewards() {
  const { betsRewards } = await fetchAPI<Res>({
    path: '/config/bets-rewards',
  })

  return betsRewards
}
