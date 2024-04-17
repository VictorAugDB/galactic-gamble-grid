import { fetchAPI } from '@/utils/fetchAPI'

export type TicketsCosts = { [key: string]: number }

type Res = {
  ticketsCosts: TicketsCosts
}

export async function getTicketsCosts() {
  const { ticketsCosts } = await fetchAPI<Res>({
    path: '/config/tickets-costs',
  })

  return ticketsCosts
}
