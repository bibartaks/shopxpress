'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import styles from './navbar.module.scss'

export default function MobileMenu() {
  const [clicked, setClicked] = useState(false)

  function handleopenMenu() {
    setClicked(!clicked)
  }

  return (
    <nav className={styles.mobile_nav_container}>
      <div className={styles.mobile_nav}>
        <Image
          className={styles.mobile_nav_icon}
          onClick={handleopenMenu}
          src="/menu.png"
          width={32}
          height={32}
          alt="menu icon"
        />
        <Link href="/">
          <Image
            className={styles.cart_icon}
            src="/cart_icon.webp"
            height={25}
            width={25}
            alt="cart icon"
            blurDataURL={'/cart_icon.webp'}
          />
        </Link>
      </div>
      {clicked ? (
        <div className={styles.mobile_nav_links}>
          <Link href="/">Home</Link>
          <Link href="/">Wishlist</Link>
          <Link href="/">About Us</Link>
          <Link href="/">Contact Us</Link>
        </div>
      ) : null}
    </nav>
  )
}
