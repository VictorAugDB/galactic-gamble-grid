'use client'

import { useState } from 'react'
import { Button } from './Button'
import { LotteryNumber } from './LotteryNumber'
import { SortBetRes, sortBet } from '@/app/actions'
import { ListWinningTickets } from './ListWinningTickets'
import { countTicketNumbers } from '@/helpers/count-ticket-numbers'
import { TicketsCosts } from '@/app/_api-resouces/get-tickets-costs'
import { toBRL } from '@/lib/intl'
import { AnimatePresence, motion } from 'framer-motion'

type SortBetProps = {
  ticketsCosts: TicketsCosts
}

export function SortBet({ ticketsCosts }: SortBetProps) {
  const [sortBetResult, setSortBetResult] = useState<Partial<SortBetRes>>({})

  async function handleSortBet() {
    const res = await sortBet()

    setSortBetResult(res)
  }

  return (
    <>
      <AnimatePresence>
        {sortBetResult.sortedNumbers ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mx-auto border-[3px] border-dotted border-orange-300 max-w-[62.3125rem] flex flex-col items-center justify-center text-orange-300 gap-5 py-5 px-2 mb-8"
          >
            <div className="text-center">
              <h4>APOSTA {sortBetResult.betId}</h4>
              <h4>NÚMEROS SORTEADOS:</h4>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              {sortBetResult.sortedNumbers.map((number) => (
                <LotteryNumber key={number} number={number} variant="orange" />
              ))}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
      <AnimatePresence>
        {sortBetResult.winningTickets &&
        sortBetResult.sortedNumbers &&
        sortBetResult.winningTickets.length ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col gap-2"
          >
            <strong className="text-center text-text-darker">Resultado</strong>
            <ListWinningTickets
              sortedNumbers={sortBetResult.sortedNumbers}
              tickets={sortBetResult.winningTickets.map((t) => ({
                id: t.id,
                numbers: t.numbers,
                reward: t.value,
                value: ticketsCosts[countTicketNumbers(t.numbers)],
              }))}
            />
            <div className="flex gap-8 text-orange-300 justify-center text-center">
              <h4>BILHETES PREMIADOS: {sortBetResult.winningTickets.length}</h4>
              <h4>
                TOTAL DO PRÊMIO{' '}
                {toBRL(
                  sortBetResult.winningTickets.reduce(
                    (acc, curr) => acc + curr.value,
                    0,
                  ),
                )}
              </h4>
            </div>
          </motion.div>
        ) : sortBetResult.winningTickets ? (
          <motion.strong
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-text-darker text-center"
          >
            Nenhum ticket premiado desta vez, continue tentando! A sorte pode
            brilhar pra você.
          </motion.strong>
        ) : null}
      </AnimatePresence>
      <Button
        onClick={handleSortBet}
        variant={'orange'}
        className="block mx-auto mb-28"
        disabled={!!sortBetResult.sortedNumbers}
      >
        SORTEAR APOSTAS
      </Button>
    </>
  )
}
