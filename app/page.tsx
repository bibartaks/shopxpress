'use client'

import Landing from '@/components/Landing'
import Navbar from '@/components/Navbar'
import Category from './components/Category/Category'

export default function Home() {
  return (
    <>
      <Navbar />
      <Landing />
      <Category />
    </>
  )
}
