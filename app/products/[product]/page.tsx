'use client'

import styles from './product_item.module.scss'
import Image from 'next/image'
import Navbar from '@/components/Navbar/Navbar'
import React from 'react'
import useSWR from 'swr'
import { useGlobalContext } from 'context/GlobalContext'
import Loading from '@/components/Loading/Loading'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import ProductItemLoadingSkeleton from '@/components/ProductItemLoadingSkeleton/ProductItemLoadingSkeleton'

export default function Product({ params }: any) {
  const { increment }: any = useGlobalContext()
  const { product } = params

  const fetcher = (...args: Parameters<typeof fetch>) =>
    fetch(...args).then((res) => res.json())

  const { data, error, isLoading } = useSWR(
    `https://fakestoreapi.com/products/${product}`,
    fetcher
  )

  const notify = () => {
    toast.success('Item added to the cart')
  }

  return (
    <>
      <>
        <section id={styles.product_item}>
          {isLoading ? (
            <ProductItemLoadingSkeleton />
          ) : (
            <div className={styles.product_item_container}>
              <div className={styles.image_content}>
                <Image
                  src={data?.image}
                  width={250}
                  height={300}
                  alt="prodct image"
                  priority
                />
              </div>
              <div className={styles.text_content}>
                <h1>{data?.title}</h1>

                <div className={styles.category}>
                  {/* <svg
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
              </svg> */}
                  <span>{data?.category}</span>
                </div>
                <div className={styles.price}>
                  <p>Price: ${data?.price}</p>
                </div>
                <div className={styles.description}>
                  <p>{data?.description}</p>
                </div>
                <button
                  // onClick={() => {
                  //   increment(data?.id), notify
                  // }}
                  onClick={() => {
                    notify()
                    increment(data?.id)
                  }}
                  className={styles.add_to_cart_btn}
                >
                  Add to cart
                </button>
                <ToastContainer />
                <br />
                <br />
              </div>
            </div>
          )}
        </section>
      </>
    </>
  )
}
