'use client'

import { MAX_NUMBER_OF_ACTIVE_TICKETS } from '@/config/max-number-of-active-tickets'
import { createContext, ReactNode, useContext, useMemo, useState } from 'react'
import { toast } from 'react-toastify'
import { TicketsCosts } from '../_api-resouces/get-tickets-costs'
import { countTicketNumbers } from '@/helpers/count-ticket-numbers'
import { chooseRandomTicketNumbers } from '@/helpers/choose-random-ticket-numbers'

export type NewTicket = {
  id: string
  filledPositions: number[]
  value: number
}

type NewTicketsProps = {
  newTickets: NewTicket[]
  totalCost: number
  handleAddNewTicket: () => void
  handleToogleNumber: (ticketId: string, number: number) => void
  handleRandomize: (ticketId: string) => void
  handlePurgeNewTickets: () => void
}

type NewTicketsContextProps = {
  children: ReactNode
  numberOfActiveTickets: number
  ticketsCosts: TicketsCosts
  userBalance: number
}

const NewTicketsContext = createContext<NewTicketsProps>({} as NewTicketsProps)

export const useNewTickets = () => useContext(NewTicketsContext)

export const NewTicketsProvider = ({
  children,
  numberOfActiveTickets,
  ticketsCosts,
  userBalance,
}: NewTicketsContextProps) => {
  const [newTickets, setNewTickets] = useState<NewTicket[]>([])
  const totalCost = useMemo(() => calculateTotal(newTickets), [newTickets])

  function handleToogleNumber(ticketId: string, number: number) {
    const currTicketIdx = newTickets.findIndex((t) => t.id === ticketId)
    const currTicket = newTickets[currTicketIdx]

    if (!currTicket) {
      return
    }

    const newFilledPositions = currTicket.filledPositions.map((val, idx) =>
      (val === 1 && idx !== number - 1) || (val !== 1 && idx === number - 1)
        ? 1
        : 0,
    )

    const previousCountSelected = countTicketNumbers(currTicket.filledPositions)
    const countSelected = countTicketNumbers(newFilledPositions)
    const previousCost = ticketsCosts[previousCountSelected] ?? 0
    const currentCost = ticketsCosts[countSelected] ?? 0

    const newTotal = totalCost - previousCost + currentCost

    if (!hasBalance(userBalance, newTotal)) {
      toast(
        'Você não tem saldo suficiente para comprar esse ticket, adicione mais dinheiro para poder escolher mais números.',
      )
      return
    }

    if (countSelected > 20) {
      toast('Um ticket deve conter no máximo 20 números selecionados.')
      return
    }

    const updatedNewTicket: NewTicket = {
      ...currTicket,
      filledPositions: newFilledPositions,
      value: currentCost,
    }

    setNewTickets([
      ...newTickets.slice(0, currTicketIdx).filter((nt) => nt.id !== ticketId),
      updatedNewTicket,
      ...newTickets.slice(currTicketIdx + 1),
    ])
  }

  function handleRandomize(ticketId: string) {
    const randomNumbers = chooseRandomTicketNumbers()

    if (
      !hasBalance(
        userBalance,
        totalCost + ticketsCosts[countTicketNumbers(randomNumbers)],
      )
    ) {
      toast(
        'Você não tem saldo suficiente para comprar esse ticket, adicione mais dinheiro para poder escolher mais números.',
      )
      return
    }

    setNewTickets(
      newTickets.map((nt) =>
        nt.id !== ticketId
          ? nt
          : {
              ...nt,
              filledPositions: randomNumbers,
              value: ticketsCosts[countTicketNumbers(randomNumbers)],
            },
      ),
    )
  }

  function handleAddNewTicket() {
    if (
      numberOfActiveTickets + newTickets.length <
      MAX_NUMBER_OF_ACTIVE_TICKETS
    ) {
      setNewTickets([
        ...newTickets,
        {
          id: crypto.randomUUID(),
          filledPositions: new Array(25).fill(0),
          value: 0,
        },
      ])
    } else {
      toast(
        `Você pode ter um máximo de ${MAX_NUMBER_OF_ACTIVE_TICKETS} tickets por aposta!`,
      )
    }
  }

  function handlePurgeNewTickets() {
    setNewTickets([])
  }

  return (
    <NewTicketsContext.Provider
      value={{
        newTickets,
        totalCost,
        handleAddNewTicket,
        handleToogleNumber,
        handleRandomize,
        handlePurgeNewTickets,
      }}
    >
      {children}
    </NewTicketsContext.Provider>
  )
}

function hasBalance(userBalance: number, total: number) {
  return userBalance - total > 0
}

function calculateTotal(newTickets: NewTicket[]) {
  return newTickets.reduce((acc, curr) => acc + curr.value, 0)
}
