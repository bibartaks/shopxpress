/* eslint-disable react/no-unescaped-entities */
import React from 'react'
import Image from 'next/image'
import styles from './ProductsBanner.module.scss'
import Link from 'next/link'
import TrendingProducts from '../TrendingProducts'

export default function ProductsBanner() {
  return (
    <section id={styles.products_banner}>
      <div className={styles.products_banner_container}>
        <div className={styles.t_shirt_bannar}>
          <div className={styles.t_shirt_bannar_text_content}>
            <h1>Men's Dresses</h1>
            <p>Explore all the cool t-shirt product's we have</p>
            <Link
              href={'/products?category=men%27s%20clothing'}
              className="transition  border-black bg-indigo-500 flex self-start px-5 py-2 rounded-md text-white hover:bg-white hover:text-black"
            >
              Shop Now
            </Link>
          </div>
          <div>
            <Image src="/shirts_new.webp" width={1000} height={1000} alt="l" />
          </div>
        </div>
        <div className={styles.womens_dress_banner}>
          <div className={styles.womens_dress_banner_text_content}>
            <h1>Women's Dresses</h1>
            <p>Explore all the cool women-dress product's we have</p>
            <Link
              href={'/products?category=women%27s%20clothing'}
              className="transition  border-black bg-indigo-500 flex self-start px-5 py-2 rounded-md text-white hover:bg-white hover:text-black"
            >
              Shop Now
            </Link>
          </div>
          <div>
            <Image
              src="/womens_dresses.jpg"
              width={1000}
              height={1000}
              alt="l"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
