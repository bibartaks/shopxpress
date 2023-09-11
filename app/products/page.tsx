/* eslint-disable react/no-unescaped-entities */
'use client'

import Navbar from '@/components/Navbar'
import React, { useState, useEffect, Suspense, ChangeEvent } from 'react'
import styles from './products.module.scss'
import Image from 'next/image'
import Link from 'next/link'
import Sidebar from '@/components/Sidebar'
import useSWR from 'swr'
import { useRouter } from 'next/navigation'
import { useSearchParams } from 'next/navigation'
import Loading from '@/components/Loading/Loading'
import fetcher from 'lib/fetcher'
import debounce from 'lodash/debounce'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

type Products = {
  id: string
  title: string
  price: number
  description: string
  category: string
  image: string
  rating: Object
}

export default function Products() {
  const router = useRouter()
  const { data, error, isLoading } = useSWR(
    `https://fakestoreapi.com/products/`,
    fetcher
  )

  const MySwal = withReactContent(Swal)

  const searchParams = useSearchParams()
  const categoryFilter = searchParams.get('category')
  const priceFilter = searchParams.get('price_range')

  const highPriceAndlowPrice = priceFilter?.split('-').map(Number)

  const [selectedPriceRangeLow, setSelectedPriceRangeLow] = useState(
    highPriceAndlowPrice ? highPriceAndlowPrice[0] : null
  )
  const [selectedPriceRangeHigh, setSelectedPriceRangeHigh] = useState(
    highPriceAndlowPrice ? highPriceAndlowPrice[1] : null
  )
  const [selectedCategory, setSelectedCategory] = useState<string>(
    categoryFilter || ''
  )

  console.log(selectedPriceRangeHigh, selectedPriceRangeLow)

  useEffect(() => {
    setSelectedCategory(categoryFilter || '')
  }, [categoryFilter])

  // const handleCategoryChange = (value: string) => {
  //   setSelectedCategory(value)

  //   router.push(
  //     `?category=${value}${
  //       selectedPriceRangeLow && selectedPriceRangeHigh
  //         ? `&price_range=${selectedPriceRangeLow}-${selectedPriceRangeHigh}`
  //         : ''
  //     }`
  //   )
  // }
  const handleCategoryChangeDebounced = debounce((value: string) => {
    setSelectedCategory(value)

    router.push(
      // `?category=${value}${
      //   selectedPriceRangeLow !== null && selectedPriceRangeHigh !== null
      //     ? `&price_range=${selectedPriceRangeLow}-${selectedPriceRangeHigh}`
      //     : ''
      // }`
      `?category=${value}${
        selectedPriceRangeLow !== null && selectedPriceRangeHigh !== null
          ? `${
              selectedPriceRangeLow > 0 && selectedPriceRangeHigh > 0
                ? `&price_range=${selectedPriceRangeLow}-${selectedPriceRangeHigh}`
                : `&price_range=`
            }`
          : ''
      }`
    )
  }, 200) // Adjust the debounce delay as needed

  // &price_range=${selectedPriceRangeLow}-${selectedPriceRangeHigh}

  const handleCategoryChange = (value: string) => {
    handleCategoryChangeDebounced(value)
  }

  const handleApplyPriceChange = () => {
    if (selectedPriceRangeHigh && selectedPriceRangeLow) {
      if (selectedPriceRangeLow !== null && selectedPriceRangeHigh !== null) {
        // if (selectedPriceRangeLow > 1 && selectedPriceRangeHigh > 1) {
        router.push(
          `?category=${selectedCategory}&price_range=${selectedPriceRangeLow}-${selectedPriceRangeHigh}`
        )
      } else {
        console.log('fuck')
      }
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Please select a price range',
        showConfirmButton: false,
        showCloseButton: true,
      })
    }
  }

  const handleClearPrice = () => {
    router.push(`?category=${selectedCategory}&price_range=`)
    setSelectedPriceRangeLow(0)
    setSelectedPriceRangeHigh(0)
  }

  const filteredData = data?.filter((product: Products) => {
    if (categoryFilter && product.category !== categoryFilter) {
      return false
    }
    if (priceFilter) {
      const [minPrice, maxPrice] = priceFilter.split('-').map(Number)
      return product.price >= minPrice && product.price <= maxPrice
    }
    return true
  })

  // if (filteredData?.length === 0) {
  //   return <h1>LOL</h1>
  // }

  return (
    <>
      <section id={styles.products}>
        <div className={styles.products_container}>
          {/* <Sidebar /> */}
          <div className={styles.sidebar}>
            {/* Price filters */}
            <div className={styles.price_range}>
              <h1>Price Range:</h1>
              <input
                required
                type="number"
                value={selectedPriceRangeLow || ''}
                onChange={(e) =>
                  setSelectedPriceRangeLow(
                    e.target.value === '' ? null : +e.target.value
                  )
                }
                placeholder={
                  highPriceAndlowPrice > 0
                    ? highPriceAndlowPrice[0]
                    : 'Enter your price'
                }
                min="0"
              />
              <input
                required
                type="number"
                value={selectedPriceRangeHigh || ''}
                onChange={(e) =>
                  setSelectedPriceRangeHigh(
                    e.target.value === '' ? null : +e.target.value
                  )
                }
                placeholder={
                  highPriceAndlowPrice > 0
                    ? highPriceAndlowPrice[1]
                    : 'Enter your price'
                }
                min="0"
              />

              <button onClick={handleApplyPriceChange}>Apply</button>
              <br />
              {selectedPriceRangeLow && selectedPriceRangeHigh ? (
                <button onClick={handleClearPrice}>Clear Filter</button>
              ) : null}
            </div>
            {/* Category filters */}
            <div className={styles.category}>
              <h1>Choose a category:</h1>
              <input
                type="radio"
                id="men"
                name="category"
                value="men's clothing"
                onChange={() => handleCategoryChange("men's clothing")}
                checked={categoryFilter === "men's clothing"}
              />
              <label htmlFor="men">Men's Clothings</label>
              <br />
              <input
                type="radio"
                id="women"
                name="category"
                value="women's clothing"
                onChange={() => handleCategoryChange("women's clothing")}
                checked={categoryFilter === "women's clothing"}
              />
              <label htmlFor="women">Women's Clothings</label>
              <br />
              <input
                type="radio"
                id="jewelery"
                name="category"
                value="jewelery"
                onChange={() => handleCategoryChange('jewelery')}
                checked={categoryFilter === 'jewelery'}
              />
              <label htmlFor="jewelery">jewelery</label>
              <br />
              <input
                type="radio"
                id="electronics"
                name="category"
                value="electronics"
                onChange={() => handleCategoryChange('electronics')}
                checked={categoryFilter === 'electronics'}
              />
              <label htmlFor="electronics">Electronics</label>
            </div>
          </div>
          {isLoading ? (
            <div className={styles.loading_skeleton_container}>
              {Array.from({ length: 7 }).map((_, index) => (
                <Loading key={index} />
              ))}
            </div>
          ) : (
            <div className={styles.products_items}>
              {filteredData?.map((products: Products) => (
                <React.Fragment key={products.id}>
                  {isLoading ? (
                    <h1 key={products.id} style={{ fontSize: '20rem' }}>
                      Loading...
                    </h1>
                  ) : (
                    <div key={products.id}>
                      <Link
                        key={products.id}
                        href={`products/${products.id}`}
                        style={{ textDecoration: 'none', color: 'black' }}
                      >
                        <div className={styles.trending_products_item}>
                          <div className={styles.trending_products_item_image}>
                            <Image
                              src={products.image}
                              height={1000}
                              width={1000}
                              alt={`${products.title} image`}
                              quality={100}
                              priority={true}
                            />
                          </div>
                          <div
                            className={styles.trending_products_item_content}
                          >
                            <h1>{products.title}</h1>
                            <div
                              className={
                                styles.trending_products_item_content_category
                              }
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                              >
                                <path
                                  d="M3.75 6C3.75 4.75736 4.75736 3.75 6 3.75H8.25C9.49264 3.75 10.5 4.75736 10.5 6V8.25C10.5 9.49264 9.49264 10.5 8.25 10.5H6C4.75736 10.5 3.75 9.49264 3.75 8.25V6Z"
                                  stroke="white"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M3.75 15.75C3.75 14.5074 4.75736 13.5 6 13.5H8.25C9.49264 13.5 10.5 14.5074 10.5 15.75V18C10.5 19.2426 9.49264 20.25 8.25 20.25H6C4.75736 20.25 3.75 19.2426 3.75 18V15.75Z"
                                  stroke="white"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M13.5 6C13.5 4.75736 14.5074 3.75 15.75 3.75H18C19.2426 3.75 20.25 4.75736 20.25 6V8.25C20.25 9.49264 19.2426 10.5 18 10.5H15.75C14.5074 10.5 13.5 9.49264 13.5 8.25V6Z"
                                  stroke="white"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M13.5 15.75C13.5 14.5074 14.5074 13.5 15.75 13.5H18C19.2426 13.5 20.25 14.5074 20.25 15.75V18C20.25 19.2426 19.2426 20.25 18 20.25H15.75C14.5074 20.25 13.5 19.2426 13.5 18V15.75Z"
                                  stroke="white"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                              <span>{products.category}</span>
                            </div>
                            <p>Price: ${products.price}</p>
                          </div>
                        </div>
                      </Link>
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
