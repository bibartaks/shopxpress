import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import GlobalContextProvider from './context/GlobalContext'
import './styles/global.scss'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
})

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
      <body className={poppins.className}>
        <GlobalContextProvider>
          <Navbar />
          {children}
          <Footer />
        </GlobalContextProvider>
      </body>
    </html>
  )
}
