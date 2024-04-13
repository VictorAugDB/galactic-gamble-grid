import { Back } from '@/components/Back'
import { Button } from '@/components/Button'
import { CurrencyCard } from '@/components/CurrencyCard'
import { Info } from '@/components/Info'
import { LotteryNumber } from '@/components/LotteryNumber'
import { Bet, ResultsTable } from '@/components/ResultsTable'
import { Tabs } from '@/components/Tabs'
import { toBRL } from '@/lib/intl'

export default function Results() {
  const sortedNumbers = [3, 4, 5, 6, 9, 10, 11, 15, 15, 16, 17, 18, 19, 23, 25]
  const sortedNumbersSet = new Set(sortedNumbers)
  const rewards = {
    11: 3,
    12: 15,
    13: 200,
    14: 1200,
    15: 1500000,
  }

  const bets: Bet[] = [
    {
      id: '#1520',
      price: 3,
      date: new Date(2023, 3, 25),
      numbersSelected: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
    },
    {
      id: '#1521',
      price: 300,
      date: new Date(2023, 3, 25),
      numbersSelected: [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17,
      ],
    },
    {
      id: '#1522',
      price: 25000,
      date: new Date(2023, 3, 25),
      numbersSelected: [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
      ],
    },
  ]

  return (
    <main className="h-full py-3 px-16 space-y-8">
      <Back />
      <h1>Perfil</h1>
      <div className="flex gap-8 flex-wrap">
        <CurrencyCard numberOfActiveBets={3} />
        <CurrencyCard balance={50000} />
        <CurrencyCard profit={-3000} />
      </div>
      <div className="pt-14 pb-4 bg-card rounded-lg px-2">
        <div className="mx-auto border-[3px] border-dotted border-orange-300 max-w-[62.3125rem] flex flex-col items-center justify-center text-orange-300 gap-5 py-5 px-2 mb-8">
          <div className="text-center">
            <h4>APOSTA #1520</h4>
            <h4>NUMEROS SORTEADOS:</h4>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            {sortedNumbers.map((number) => (
              <LotteryNumber key={number} number={number} variant="orange" />
            ))}
          </div>
        </div>
        <Button variant={'orange'} className="block mx-auto mb-28">
          SORTEAR APOSTAS
        </Button>
        <Tabs />
        <div className="px-7 space-y-8">
          <div className="space-y-5">
            <ResultsTable sortedNumbers={sortedNumbersSet} data={bets} />
            <div className="flex gap-8 text-orange-300">
              <h4>BILHETES PREMIADOS 2</h4>
              <h4>TOTAL DO PRÊMIO {toBRL(6)}</h4>
            </div>
          </div>
          <Info rewards={rewards} />
        </div>
      </div>
    </main>
  )
}
