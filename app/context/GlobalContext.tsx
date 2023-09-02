'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

const GlobalContext = createContext({})

export default function GlobalContextProvider({
  children,
}: {
  children: React.ReactNode
}) {
  // // Initialize cartItems with items from local storage or an empty array if there are none

  // const isBrowser = typeof window !== 'undefined';

  // const [cartItems, setCartItems] = useState(
  //   JSON.parse(localStorage.getItem('cartItems')) || []
  // )

  // // Save cartItems to local storage whenever it changes
  // useEffect(() => {
  //   localStorage.setItem('cartItems', JSON.stringify(cartItems))
  // }, [cartItems])

  // Check if localStorage is available (for server-side rendering)
  const isBrowser = typeof window !== 'undefined'

  // Initialize cartItems with items from local storage or an empty array if there are none
  const [cartItems, setCartItems] = useState(
    isBrowser ? JSON.parse(localStorage.getItem('cartItems')) || [] : []
  )

  // Save cartItems to local storage whenever it changes (on the client side)
  useEffect(() => {
    if (isBrowser) {
      localStorage.setItem('cartItems', JSON.stringify(cartItems))
    }
  }, [cartItems])

  function increment(id: number) {
    // Find the index of the item with the given ID in cartItems
    const itemIndex = cartItems.findIndex((item: any) => item.id === id)

    if (itemIndex !== -1) {
      // If the item is already in the cart, update its quantity
      const updatedCartItems = [...cartItems]
      updatedCartItems[itemIndex].quantity += 1
      setCartItems(updatedCartItems)
    } else {
      // If the item is not in the cart, add it as a new item
      const newItem = { id, quantity: 1 }
      setCartItems([...cartItems, newItem])
    }
  }

  function deccrement(id: number) {
    // Find the index of the item with the given ID in cartItems
    const itemIndex = cartItems.findIndex((item: any) => item.id === id)

    if (itemIndex !== -1) {
      // If the item is already in the cart and its quantity is greater than 0, decrement its quantity
      const updatedCartItems = [...cartItems]
      if (updatedCartItems[itemIndex].quantity > 0) {
        updatedCartItems[itemIndex].quantity -= 1
        setCartItems(updatedCartItems)
      }
      // If the item's quantity becomes 0, remove it from the cart
      if (updatedCartItems[itemIndex].quantity === 0) {
        updatedCartItems.splice(itemIndex, 1)
        setCartItems(updatedCartItems)
      }
    }
  }

  const totalQuantity = cartItems.reduce(
    (total: number, item: any) => total + item.quantity,
    0
  )

  return (
    <GlobalContext.Provider
      value={{ cartItems, increment, deccrement, totalQuantity }}
    >
      {children}
    </GlobalContext.Provider>
  )
}

export const useGlobalContext = () => useContext(GlobalContext)
