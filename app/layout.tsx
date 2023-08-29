import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import GlobalContextProvider from './context/GlobalContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'ShopXPress',
  description: 'An ecommerce website created with 💖 by Bibarta',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <GlobalContextProvider>{children}</GlobalContextProvider>
      </body>
    </html>
  )
}
