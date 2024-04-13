'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Nav } from './_components/Nav'
import { LogOut, Menu, X } from 'lucide-react'
import { Logo } from './_components/Logo'
import { Button } from '../Button'

export function Header() {
  const [isNavVisible, setIsNavVisible] = useState(false)
  const [user, setUser] = useState({
    id: '',
  })

  useEffect(() => {
    setUser({
      id: crypto.randomUUID(),
    })
  }, [setUser])

  function toogleNav() {
    setIsNavVisible(!isNavVisible)
  }

  return (
    <header className="flex justify-between w-full items-center gap-2 bg-background  px-8">
      <div className="flex gap-2 items-center">
        <Menu
          onClick={toogleNav}
          className=" text-white cursor-pointer hover:text-blue-400 transition duration-300"
        />
        <Logo />
        {isNavVisible && (
          <div className="fixed left-0 top-0 z-10 h-screen w-screen bg-[rgba(0,0,0,0.2)]"></div>
        )}
      </div>
      <div className="hidden md:flex gap-8 divide-x-2">
        <UserInfo userId={user.id} />
        <BuyTicketsButton />
      </div>

      <AnimatePresence>
        {isNavVisible ? (
          <motion.div
            className="fixed left-0 top-0 z-20 h-screen w-52 space-y-6 border-r border-slate-800 bg-card px-container shadow-sm shadow-border sm:w-72 py-4"
            initial={{ opacity: 0, x: '-200px' }}
            exit={{ opacity: 0, x: '-200px' }}
            animate={{ opacity: 1, x: '0' }}
            transition={{ duration: 0.2 }}
          >
            <div className="w-full flex justify-end px-2">
              <X
                onClick={() => setIsNavVisible(false)}
                className="text-white cursor-pointer hover:text-blue-400 transition duration-300"
              />
            </div>

            <div className="flex flex-col items-center gap-2 justify-center">
              <Logo />
              <div className="pt-2 flex flex-col items-center justify-center gap-8 md:hidden border border-slate-700 rounded p-4">
                <UserInfo userId={user.id} />
                <BuyTicketsButton />
              </div>
            </div>
            <div>
              <Nav
                setIsNavVisible={setIsNavVisible}
                className="flex-col divide-y-[1px] divide-slate-700"
              />
            </div>
          </motion.div>
        ) : null}{' '}
      </AnimatePresence>
    </header>
  )
}

type UserInfoProps = {
  userId: string
}

function UserInfo({ userId }: UserInfoProps) {
  return (
    <div id="user-info" className="flex gap-2.5 items-center">
      <div
        id="avatar"
        className="flex items-center justify-center rounded-full border border-gray-700 bg-gray-900 text-gray-700 h-[3.125rem] w-[3.125rem]"
      >
        <strong>LC</strong>
      </div>
      <div className="gap-1.5">
        <div className="truncate w-[5.75rem]">
          <strong className="text-blue-400">{userId}</strong>
        </div>
        <strong className="text-green-400 text-sm">R$ 50.000,00</strong>
      </div>
      <LogOut className="ml-[9px] text-yellow-400" />
    </div>
  )
}

function BuyTicketsButton() {
  return (
    <div className="pl-8">
      <Button variant="darker-blue" size="sm" className="gap-1.5 font-bold">
        COMPRE TICKETS
        <img src="/images/cifon-coin.svg" alt="coin"></img>
      </Button>
    </div>
  )
}
