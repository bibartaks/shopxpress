'use client'

import { useGlobalContext } from 'context/GlobalContext'
import Link from 'next/link'
import React, { useState, useEffect } from 'react'

export default function TotalQuantity() {
  const { cartItems, totalQuantity }: any = useGlobalContext()

  const [localTotalItemCount, setLocalTotalItemCount] = useState()

  useEffect(() => {
    const total = cartItems?.reduce(
      (total: number, item: any) => total + item.quantity,
      0
    )
    setLocalTotalItemCount(total)
  }, [cartItems])
  return <p>{localTotalItemCount ? localTotalItemCount : null}</p>
}
