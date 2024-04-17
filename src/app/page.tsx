import { Back } from '@/components/Back'
import { Info } from '@/components/Info'
import { Tabs } from '@/components/Tabs'
import { countTicketNumbers } from '@/helpers/count-ticket-numbers'
import { toBRL } from '@/lib/intl'
import { getTicketsCosts } from './_api-resouces/get-tickets-costs'
import { getActiveTickets } from './_api-resouces/get-active-tickets'
import { getUserBalance } from './_api-resouces/get-user-balance'
import { NewTicketsProvider } from './contexts/NewTicketsContext'
import { BuyTickets } from '@/components/BuyTickets'
import { InfoCard } from '@/components/InfoCard/InfoCard'
import { ListTickets } from '@/components/ListTickets'
import { AddTicket } from '@/components/AddTicket'

export default async function Home() {
  const ticketsCosts = await getTicketsCosts()

  const userTickets = await getActiveTickets()

  const userBalance = await getUserBalance()

  const userTicketsWithValues = userTickets.map((ut) => ({
    ...ut,
    value: ticketsCosts[countTicketNumbers(ut.numbers)],
  }))

  return (
    <main className="h-full py-3 px-2 sm:px-16 space-y-8">
      <Back />
      <h1>Perfil</h1>
      <NewTicketsProvider
        numberOfActiveTickets={userTicketsWithValues.length}
        ticketsCosts={ticketsCosts}
        userBalance={userBalance}
      >
        <div className="flex gap-8 flex-wrap">
          <InfoCard numberOfActiveBets={userTicketsWithValues.length} />

          <InfoCard balance={userBalance} />
        </div>
        <div className="py-4 bg-card rounded-lg space-y-9">
          <Tabs numberOfTickets={userTicketsWithValues.length} />
          <div className="px-1 sm:px-7 space-y-8">
            <div className="space-y-3">
              <div className="flex gap-11 pb-3 flex-wrap justify-center">
                <ListTickets tickets={userTicketsWithValues} />
                <AddTicket />
              </div>
              <strong className="text-text-medium">
                VALOR TOTAL:{' '}
                <span className="text-green-400">
                  {toBRL(
                    userTicketsWithValues.reduce(
                      (acc, curr) => acc + curr.value,
                      0,
                    ),
                  )}
                </span>
              </strong>
            </div>
            <BuyTickets />
            <Info ticketsValues={ticketsCosts} />
          </div>
        </div>
      </NewTicketsProvider>
    </main>
  )
}
