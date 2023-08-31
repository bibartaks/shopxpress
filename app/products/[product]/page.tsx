'use client'

import Navbar from '@/components/Navbar/Navbar'
import React from 'react'
import useSWR from 'swr'

export default function Product({ params }) {
  const { product } = params
  const fetcher = (...args: Parameters<typeof fetch>) =>
    fetch(...args).then((res) => res.json())

  const { data, error, isLoading } = useSWR(
    `https://fakestoreapi.com/products/${product}`,
    fetcher
  )
  return (
    <>
      <Navbar />
      <h1>{data?.title}</h1>
    </>
  )
}
