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
  const searchParams = useSearchParams()
  const typeFilter = searchParams.get('category')

  const fetcher = (...args: Parameters<typeof fetch>) =>
    fetch(...args).then((res) => res.json())

  const { data, error, isLoading } = useSWR(
    `https://fakestoreapi.com/products/`,
    fetcher
  )

  const displayeProducts = typeFilter
    ? data?.filter((product: Products) => product.category === typeFilter)
    : data

  const handleCategoryChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedCategory = e.target.value
    selectedCategory
      ? router.push(`?category=${selectedCategory}`)
      : router.push(`../`)
  }

  // const res = await fetch(`https://fakestoreapi.com/products/`)
  // const data = await res.json()

  return (
    <>
      <Navbar />
      <section id={styles.products}>
        <div className={styles.products_container}>
          {/* <Sidebar /> */}
          <div className={styles.sidebar}>
            <div className={styles.price_range}>
              <h1>Price Range:</h1>
              <input type="number" placeholder="7" />
              <input type="number" placeholder="200" />
              <button>Apply</button>
            </div>
            <div className={styles.category}>
              <h1>Choose a category:</h1>
              <select id="Choose a category:" onChange={handleCategoryChange}>
                <option value="/">All categories</option>
                <option value="men's clothing">Mens clothing</option>
                <option value="women's clothing">Womens clothing</option>
                <option value="jewelery">Jewelery</option>
                <option value="electronics">Electronics</option>
              </select>
            </div>
          </div>
          <div className={styles.products_items}>
            {displayeProducts?.map((products: Products) => (
              <>
                {isLoading ? (
                  <h1 style={{ fontSize: '20rem' }}>Loading...</h1>
                ) : (
                  <div key={products.id}>
                    <Link
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
                            quality={10}
                            priority={true}
                          />
                        </div>
                        <div className={styles.trending_products_item_content}>
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
              </>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}