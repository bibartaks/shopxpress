import React from 'react'
import styles from './trending_products.module.scss'
import Image from 'next/image'

type Products = {
  id: string
  title: string
  price: number
  description: string
  category: string
  image: string
  rating: Object
}

export default async function TrendingProducts() {
  const res = await fetch('https://fakestoreapi.com/products')
  const data = await res.json()

  return (
    <section id={styles.trending_products}>
      <div className={styles.trending_products_container}>
        <h1 className={styles.trending_products_title}>Trending Products 🔥</h1>
        <div className={styles.trending_products_items}>
          {data.slice(0, 5).map((products: Products) => (
            <div key={products.id} className={styles.trending_products_item}>
              <div className={styles.trending_products_item_image}>
                <Image
                  src={products.image}
                  height={1000}
                  width={1000}
                  alt={`${products.title} image`}
                  priority
                />
              </div>
              <div className={styles.trending_products_item_content}>
                <h1>{products.title}</h1>
                <div className={styles.trending_products_item_content_category}>
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
          ))}
        </div>
      </div>
    </section>
  )
}
