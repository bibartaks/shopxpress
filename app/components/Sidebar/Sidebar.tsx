'use client'

import React, { ChangeEvent } from 'react'
import styles from './siderbar.module.scss'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useSearchParams } from 'next/navigation'

export default function Sidebar() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const search = searchParams.get('category')
  console.log(search)

  const handleCategoryChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedCategory = e.target.value
    console.log(selectedCategory)
    router.push(`?category=${selectedCategory}`)
  }

  return (
    <div className={styles.sidebar}>
      <div className={styles.price_range}>
        <h1>Price Range:</h1>
        <input type="number" placeholder="7" />
        <input type="number" placeholder="200" />
        <button>Apply</button>
      </div>
      <div className={styles.category}>
        <h1>Choose a category:</h1>
        <select
          id="Choose a category:"
          value="fuck"
          onChange={handleCategoryChange}
        >
          <option value="men's clothing">All</option>
          <option value="men's clothing">Mens Clothing</option>
          <option value="saab">Womens clothing</option>
          <option value="opel">Jewelery</option>
          <option value="audi">Electronics</option>
        </select>
      </div>
    </div>
  )
}
