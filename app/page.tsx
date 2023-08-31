import Landing from '@/components/Landing'
import Navbar from '@/components/Navbar'
import Category from '@/components/Category'
import TrendingProducts from '@/components/TrendingProducts'

export default function Home() {
  return (
    <>
      <Navbar />
      <Landing />
      <Category />
      <TrendingProducts />
    </>
  )
}
