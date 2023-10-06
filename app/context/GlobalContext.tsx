'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

const GlobalContext = createContext({})

export default function GlobalContextProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const isBrowser = typeof window !== 'undefined'

  const savedCartItems = isBrowser
    ? JSON.parse(localStorage.getItem('cartItems') ?? 'null') || []
    : []

  const [cartItems, setCartItems] = useState(savedCartItems)

  // Initialize cartItems with items from local storage or an empty array if there are none
  // const [cartItems, setCartItems] = useState(
  //   isBrowser ? JSON.parse(localStorage.getItem('cartItems')) || [] : []
  // )

  // Save cartItems to local storage whenever it changes (on the client side)
  useEffect(() => {
    if (isBrowser) {
      localStorage.setItem('cartItems', JSON.stringify(cartItems))
    }
  }, [cartItems.isBrowser])

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

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',

    // These options are needed to round to whole numbers if that's what you want.
    //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
  })

  function itemTotalPrice(price: number, id: number) {
    const totalPrice = price * getItemQuantity(id)
    return formatter.format(totalPrice)
  }

  function deleteItem(id: number) {
    // Find the index of the item with the given ID in cartItems
    const itemIndex = cartItems.findIndex((item: any) => item.id === id)

    if (itemIndex !== -1) {
      // If the item is in the cart, remove it from cartItems
      const updatedCartItems = [...cartItems]
      updatedCartItems.splice(itemIndex, 1)
      setCartItems(updatedCartItems)
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

  function getItemQuantity(id: number) {
    // Find the index of the item with the given ID in cartItems
    const itemIndex = cartItems.findIndex((item: any) => item.id === id)

    if (itemIndex !== -1) {
      // If the item is in the cart, return its quantity
      return cartItems[itemIndex].quantity
    } else {
      // If the item is not in the cart, return 0
      return 0
    }
  }

  function calculateTotalPrice() {
    const totalPrice = cartItems.reduce((acc: any, item: any) => {
      // Assuming each item has a 'price' property
      const itemPrice = item.price || 0
      return acc + itemPrice * item.quantity
    }, 0)

    return formatter.format(totalPrice)
  }

  return (
    <GlobalContext.Provider
      value={{
        cartItems,
        increment,
        deccrement,
        totalQuantity,
        getItemQuantity,
        deleteItem,
        itemTotalPrice,
        calculateTotalPrice,
      }}
    >
      {children}
    </GlobalContext.Provider>
  )
}

export const useGlobalContext = () => useContext(GlobalContext)
