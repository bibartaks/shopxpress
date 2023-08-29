'use client'

import React, { createContext, useContext } from 'react'

const GlobalContext = createContext({})

export default function GlobalContextProvider({
  children,
}: {
  children: React.ReactNode
}) {
  let value = 7

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  )
}

export const useGlobalContext = () => useContext(GlobalContext)
