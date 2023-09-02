'use client'

import { useGlobalContext } from 'context/GlobalContext'
import React, { useState, useEffect } from 'react'

export default function TotalQuantity() {
  const { cartItems }: any = useGlobalContext()

  const [localTotalItemCount, setLocalTotalItemCount] = useState(0)

  useEffect(() => {
    const total = cartItems.reduce(
      (total: number, item: any) => total + item.quantity,
      0
    )
    setLocalTotalItemCount(total)
  }, [cartItems])
  return <p>{localTotalItemCount}</p>
}
