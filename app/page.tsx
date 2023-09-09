import Landing from '@/components/Landing'
import Navbar from '@/components/Navbar'
import Category from '@/components/Category'
import TrendingProducts from '@/components/TrendingProducts'
import ProductsBanner from './components/ProductsBanner/ProductsBanner'

export default function Home() {
  return (
    <>
      <Landing />
      <Category />
      <TrendingProducts />
      <ProductsBanner />
    </>
  )
}
