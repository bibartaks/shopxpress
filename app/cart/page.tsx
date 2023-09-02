'use client'

import Navbar from '@/components/Navbar/Navbar'
import useSWR from 'swr'
import React from 'react'
import { useGlobalContext } from 'context/GlobalContext'

type ProductItem = {
  id: string
  title: string
  description: string
  price: number
  category: string
  image: string
}

export default function Cart() {
  const { cartItems } = useGlobalContext()

  const fetcher = (...args: Parameters<typeof fetch>) =>
    fetch(...args).then((res) => res.json())

  const { data, isLoading, error } = useSWR(
    'https://fakestoreapi.com/products',
    fetcher
  )

  const filteredData = data?.filter((product) =>
    cartItems.some((cartItem) => cartItem.id === product.id)
  )

  console.log(filteredData)

  return (
    <>
      <Navbar />
      <section>
        <h1>Cart</h1>
        {filteredData?.map((data) => (
          <h1>{data.title}</h1>
        ))}
      </section>
    </>
  )
}
