import 'react-toastify/dist/ReactToastify.css'
import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/Header'
import { Bounce, ToastContainer } from 'react-toastify'

const roboto = Roboto({ subsets: ['latin'], weight: ['400', '700'] })

export const metadata: Metadata = {
  title: 'Galatic Gamble Grid - Your Dream Galatic Lottery',
  description:
    "Here, your fate hangs in the balance of luck's scales, where one spin could sculpt your future into opulence or obscurity.!",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <div className="h-full grid grid-rows-layout">
          <Header />
          {children}
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            className="w-[484px]"
            theme="dark"
            pauseOnHover
            transition={Bounce}
          />
        </div>
      </body>
    </html>
  )
}
