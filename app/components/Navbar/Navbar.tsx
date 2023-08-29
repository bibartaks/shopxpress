import React from 'react'
import styles from './navbar.module.scss'
import Link from 'next/link'
import Image from 'next/image'
import MobileMenu from './MobileMenu'

export default function Navbar() {
  return (
    <nav className={styles.nav}>
      <div className={styles.nav_container}>
        <div className={styles.logo}>
          <h1>ShopXPress</h1>
        </div>
        <div className={styles.links}>
          <Link href="/">Home</Link>
          <Link href="/">Wishlist</Link>
          <Link href="/">About Us</Link>
          <Link href="/">Contact Us</Link>
          <Link href="/">
            <Image
              className={styles.cart_icon}
              src="/cart_icon.webp"
              height={50}
              width={50}
              alt="cart icon"
              placeholder="blur"
              blurDataURL={'/cart_icon.webp'}
            />
          </Link>
        </div>
        {/* Mobile Navbar */}
        <div className={styles.mobile_nav_container}>
          <MobileMenu />
        </div>
      </div>
    </nav>
  )
}
