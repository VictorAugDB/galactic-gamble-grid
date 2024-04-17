'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { Ticket } from './Ticket'

type TicketProps = {
  numbers: number[]
  id: string
  value: number
  reward: number
}

type ListWinningTicketsProps = {
  tickets: TicketProps[]
  sortedNumbers: number[]
}

export function ListWinningTickets({
  tickets,
  sortedNumbers,
}: ListWinningTicketsProps) {
  return (
    <div className="flex gap-8 items-center justify-center flex-wrap">
      <AnimatePresence>
        {tickets.map((mt, idx) => (
          <motion.div
            key={mt.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Ticket
              sortedNumbers={new Set(sortedNumbers)}
              filledPositions={mt.numbers}
              idx={idx}
              value={mt.value}
              reward={mt.reward}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
