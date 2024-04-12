import { Back } from '@/components/Back'
import { CurrencyCard } from '@/components/CurrencyCard'
import { Tabs } from '@/components/Tabs'

export default function Results() {
  return (
    <main className="h-full py-3 px-16 space-y-8">
      <Back />
      <h1>Perfil</h1>
      <div className="flex gap-8 flex-wrap">
        <CurrencyCard numberOfActiveBets={3} />
        <CurrencyCard balance={50000} />
        <CurrencyCard profit={-3000} />
      </div>
      <div className="py-4 bg-card rounded-lg space-y-9">
        <Tabs />
      </div>
    </main>
  )
}
