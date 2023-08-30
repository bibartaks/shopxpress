import React from 'react'
import styles from './category.module.scss'
import Image from 'next/image'

export default function Category() {
  return (
    <section id={styles.category}>
      <div className={styles.category_container}>
        <h1>Category</h1>
        <div className={styles.category_boxes}>
          <div className={styles.category_box}>
            <Image
              src="/t-shirt.png"
              width={50}
              height={50}
              alt="t hisrt logo"
            />
            <h1>Mens Clothing</h1>
          </div>
          <div className={styles.category_box}>
            <Image
              src="/tshirt.png"
              width={50}
              height={50}
              alt="t hisrt logo"
            />
            <h1>Womens Clothing</h1>
          </div>
          <div className={styles.category_box}>
            <Image
              src="/responsive.png"
              width={50}
              height={50}
              alt="t hisrt logo"
            />
            <h1>Electronics</h1>
          </div>
          <div className={styles.category_box}>
            <Image
              src="/necklace.png"
              width={50}
              height={50}
              alt="t hisrt logo"
            />
            <h1>Jewelrys</h1>
          </div>
        </div>
      </div>
    </section>
  )
}
