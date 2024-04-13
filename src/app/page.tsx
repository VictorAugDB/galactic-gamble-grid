import { Back } from '@/components/Back'
import { Button } from '@/components/Button'
import { CurrencyCard } from '@/components/CurrencyCard'
import { Info } from '@/components/Info'
import { Tabs } from '@/components/Tabs'
import { Ticket } from '@/components/Ticket'
import { toBRL } from '@/lib/intl'

export default function Home() {
  const ticketsValues = {
    15: 3,
    16: 100,
    17: 300,
    18: 5000,
    19: 15000,
    20: 25000,
  }
  const userTickets = [
    {
      id: '1',
      value: 3,
      numbers: [
        1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 0, 1,
        1,
      ],
    },
    {
      id: '2',
      value: 300,
      numbers: [
        1, 1, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1,
        0,
      ],
    },
    {
      id: '3',
      value: 25000,
      numbers: [1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0],
    },
    {
      id: '4',
      value: 300,
      numbers: [
        1, 1, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1,
        0,
      ],
    },
    {
      id: '5',
      value: 25000,
      numbers: [1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0],
    },
    {
      id: '6',
      value: 300,
      numbers: [
        1, 1, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1,
        0,
      ],
    },
    {
      id: '7',
      value: 25000,
      numbers: [1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0],
    },
    {
      id: '8',
      value: 300,
      numbers: [
        1, 1, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1,
        0,
      ],
    },
    {
      id: '9',
      value: 25000,
      numbers: [1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0],
    },
    {
      id: '10',
      value: 300,
      numbers: [
        1, 1, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1,
        0,
      ],
    },
    {
      id: '11',
      value: 25000,
      numbers: [1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0],
    },
  ]

  return (
    <main className="h-full py-3 px-2 sm:px-16 space-y-8">
      <Back />
      <h1>Perfil</h1>
      <div className="flex gap-8 flex-wrap">
        <CurrencyCard numberOfActiveBets={3} />
        <CurrencyCard balance={50000} />
      </div>
      <div className="py-4 bg-card rounded-lg space-y-9">
        <Tabs numberOfTickets={userTickets.length} />
        <div className="px-1 sm:px-7 space-y-8">
          <div className="space-y-3">
            <div className="flex gap-11 pb-3 flex-wrap justify-center">
              {userTickets.map((ut, idx) => (
                <Ticket
                  key={ut.id}
                  filledPositions={ut.numbers}
                  idx={idx}
                  value={ut.value}
                />
              ))}
              <img
                className="hover:scale-110 transition-transform duration-300 cursor-pointer"
                src="/images/add_ticket.png"
                alt="add ticket"
              />
            </div>
            <strong className="text-text-medium">
              VALOR TOTAL:{' '}
              <span className="text-green-400">
                {toBRL(userTickets.reduce((acc, curr) => acc + curr.value, 0))}
              </span>
            </strong>
          </div>
          <Button className="mx-auto block">COMPRAR BILHETES</Button>
          <Info ticketsValues={ticketsValues} />
        </div>
      </div>
    </main>
  )
}
