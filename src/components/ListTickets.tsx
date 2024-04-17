'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { Ticket } from './Ticket'
import { useNewTickets } from '@/app/contexts/NewTicketsContext'

type TicketProps = {
  numbers: number[]
  id: string
  value: number
  isNew?: boolean
}

type ListTicketsProps = {
  tickets: TicketProps[]
}

export function ListTickets({ tickets }: ListTicketsProps) {
  const { newTickets } = useNewTickets()

  const mergedTickets: TicketProps[] = [
    ...tickets,
    ...newTickets.map((nt) => ({
      id: nt.id,
      numbers: nt.filledPositions,
      value: nt.value,
      isNew: true,
    })),
  ]

  return (
    <>
      {mergedTickets.length ? (
        <AnimatePresence>
          {mergedTickets.map((mt, idx) => (
            <motion.div
              key={mt.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Ticket
                filledPositions={mt.numbers}
                idx={mt.isNew ? undefined : idx}
                value={mt.value}
                newTicketId={mt.isNew ? mt.id : undefined}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      ) : null}
    </>
  )
}
