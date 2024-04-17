import { Back } from '@/components/Back'
import { Info } from '@/components/Info'
import { InfoCard } from '@/components/InfoCard/InfoCard'
import { ResultsTable } from '@/components/ResultsTable'
import { Tabs } from '@/components/Tabs'
import { getBetsRewards } from '../_api-resouces/get-bets-rewards'
import { getBets } from '../_api-resouces/get-bets'
import { getNumberOfActiveTickets } from '../_api-resouces/get-number-of-active-tickets'
import { getUserBalance } from '../_api-resouces/get-user-balance'
import { getUserProfit } from '../_api-resouces/get-user-profit'
import { SortBet } from '@/components/SortBet'
import { getTicketsCosts } from '../_api-resouces/get-tickets-costs'

export default async function Results() {
  const betsNumbersRewards = await getBetsRewards()

  const ticketsCosts = await getTicketsCosts()

  const bets = await getBets()

  const numberOfActiveTickets = await getNumberOfActiveTickets()

  const userBalance = await getUserBalance()

  const userProfit = await getUserProfit()

  return (
    <main className="h-full py-3 px-16 space-y-8">
      <Back />
      <h1>Perfil</h1>
      <div className="flex gap-8 flex-wrap">
        <InfoCard numberOfActiveBets={numberOfActiveTickets} />
        <InfoCard balance={userBalance} />
        <InfoCard profit={userProfit} />
      </div>
      <div className="pt-14 pb-4 bg-card rounded-lg px-2">
        <div className="w-full flex flex-col gap-2">
          <SortBet ticketsCosts={ticketsCosts} />
        </div>
        <Tabs />
        <div className="px-7 space-y-8">
          <div className="space-y-5">
            <ResultsTable data={bets} />
          </div>
          <Info rewards={betsNumbersRewards} />
        </div>
      </div>
    </main>
  )
}
