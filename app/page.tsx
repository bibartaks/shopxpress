import Landing from '@/components/Landing'
import Navbar from '@/components/Navbar'
import Category from '@/components/Category'
import TrendingProducts from '@/components/TrendingProducts'
import ProductsBanner from './components/ProductsBanner/ProductsBanner'
import BestDeals from './components/BestDeals/BestDeals'
import Footer from './components/Footer/Footer'

export default function Home() {
  return (
    <>
      <Landing />
      <Category />
      <TrendingProducts />
      <ProductsBanner />
      <BestDeals />
    </>
  )
}
