'use client'

import Navbar from '@/components/Navbar/Navbar'
import useSWR from 'swr'
import React from 'react'
import { useGlobalContext } from 'context/GlobalContext'
import getProductData from 'lib/productCartFecher'
import fetcher from 'lib/fetcher'
import Image from 'next/image'
import styles from './cart.module.scss'

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import Footer from '@/components/Footer/Footer'

const MySwal = withReactContent(Swal)

function handleOrder() {
  Swal.fire({
    icon: 'success',
    title: 'Your order has been placed',
    showConfirmButton: false,
    showCloseButton: true,
  })
}

type ProductItem = {
  id: string
  title: string
  description: string
  price: number
  category: string
  image: string
}

export default function Cart() {
  const {
    cartItems,
    getItemQuantity,
    increment,
    deccrement,
    deleteItem,
    itemTotalPrice,
  }: any = useGlobalContext()

  const { data, isLoading, error } = useSWR(
    'https://fakestoreapi.com/products',
    fetcher
  )

  const filteredData = data?.filter((product: any) =>
    cartItems?.some((cartItem) => cartItem.id === product.id)
  )

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  })

  const newTotalPrice = filteredData?.reduce((accumulator, data) => {
    const itemQuantity = getItemQuantity(data?.id)
    return accumulator + data?.price * itemQuantity
  }, 0)

  return (
    <div className={styles.lol}>
      <section id={styles.cart}>
        {filteredData?.map((data) => (
          <div key={data.id} id={styles.cart_item}>
            <div className={styles.cart_item_image}>
              <Image
                src={data.image}
                width={80}
                height={100}
                alt="product image"
              />
            </div>
            <div className={styles.product_details}>
              <h3>{data?.title}</h3>
              <h5>{data?.category}</h5>
              <p>$ {data?.price}</p>
            </div>
            <div className={styles.product_btns}>
              {/* <h3>+</h3> */}
              <button>
                <svg
                  onClick={() => increment(data?.id)}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6v12m6-6H6"
                  />
                </svg>
              </button>

              <p>{getItemQuantity(data?.id)}</p>
              <button>
                <svg
                  onClick={() => deccrement(data?.id)}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M18 12H6"
                  />
                </svg>
              </button>
            </div>
            <div className={styles.product_item_total_price}>
              {/* <h3>2000</h3> */}
              {/* {data?.price * getItemQuantity(data?.id)} */}
              {/* {itemTotalPrice(data.?price, data.?id)} */}
              {itemTotalPrice(data?.price, data?.id)}
            </div>
            <div className={styles.delete_btn}>
              <svg
                onClick={() => deleteItem(data?.id)}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="red"
                className="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                />
              </svg>
            </div>
          </div>
        ))}
      </section>
      <div id={styles.check_out}>
        <h1>Bill Details</h1>
        <div className={styles.check_out_details}>
          <div className={styles.check_out_details_item}>
            <h3>Sub Total:</h3>
            <p>{formatter.format(newTotalPrice)}</p>
          </div>
          <div className={styles.check_out_details_item}>
            <h3>Discount:</h3>
            <p>USD 0</p>
          </div>

          <div className={styles.check_out_details_item}>
            <h3>Vat</h3>
            <p>USD 0</p>
          </div>
          <div className={styles.check_out_details_item}>
            <h3>Total</h3>
            <p>{formatter.format(newTotalPrice)}</p>
          </div>
          <div className={styles.place_order}>
            <button onClick={handleOrder}>Place Order</button>
          </div>
        </div>
      </div>
    </div>
  )
}
