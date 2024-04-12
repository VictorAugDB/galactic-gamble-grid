import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ComponentProps, useEffect, useState } from 'react'

import { cn } from '@/lib/utils'

const logoutText = 'Logout'

const links = [
  { href: '/', label: 'Profile' },
  { href: '/results', label: 'Results' },
]

type NavProps = ComponentProps<'nav'> & {
  setIsNavVisible: (state: boolean) => void
}

export function Nav({ setIsNavVisible, className, ...props }: NavProps) {
  const pathname = usePathname()
  const [currentTab, setCurrentTab] = useState<string>()

  useEffect(() => {
    setCurrentTab(pathname)
  }, [pathname])

  function handleOnClick() {
    setIsNavVisible(false)
  }

  return (
    <nav className={cn('flex items-center', className)} {...props}>
      {links.map((l) => {
        return (
          <Link
            onClick={handleOnClick}
            data-is-current-tab={
              currentTab === l.href && l.label !== logoutText
            }
            className="text-white py-3 transition-all bg-transparent duration-500 rounded hover:text-green-400 hover:bg-blue-500 data-[is-current-tab=true]:font-bold data-[is-current-tab=true]:text-link w-full text-center"
            key={l.label}
            href={l.href}
          >
            {l.label}
          </Link>
        )
      })}
    </nav>
  )
}
