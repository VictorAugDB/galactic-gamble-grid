'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

type TabsProps = {
  numberOfTickets?: number
}

export function Tabs({ numberOfTickets }: TabsProps) {
  const currentPath = usePathname()

  return (
    <div className="px-7 w-full border-b-2 border-slate-800 flex pb-3 items-center gap-8">
      <Link href="/" className="relative">
        <div
          data-is-current-path={currentPath === '/'}
          className="flex gap-2 items-center"
        >
          <strong
            data-is-current-tab={currentPath === '/'}
            className="text-sm data-[is-current-tab=true]:text-blue-400"
          >
            BILHETES
          </strong>
        </div>
        {currentPath === '/' ? <CurrentTabIndicator /> : null}
      </Link>
      <Link href="/results" className="relative">
        <strong
          data-is-current-tab={currentPath === '/results'}
          className="text-text-medium text-sm flex data-[is-current-tab=true]:text-blue-400"
        >
          RESULTADOS
        </strong>
        {currentPath === '/results' ? <CurrentTabIndicator /> : null}
      </Link>
    </div>
  )
}

function CurrentTabIndicator() {
  return (
    <div className="w-full h-0.5 bg-blue-400 translate-y-3.5 absolute bottom-0"></div>
  )
}
