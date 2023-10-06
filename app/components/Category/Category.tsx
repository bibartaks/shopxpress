import React from 'react'
import styles from './category.module.scss'
import Image from 'next/image'
import Link from 'next/link'

export default function Category() {
  return (
    <section id={styles.category}>
      <div className={styles.category_container}>
        <h1>Category</h1>
        <div className={styles.category_boxes}>
          <Link
            href={'/products?category=men%27s%20clothing'}
            className={styles.category_box}
          >
            <Image
              src="/t-shirt.png"
              width={50}
              height={50}
              alt="t hisrt logo"
            />
            <h1>Mens Clothing</h1>
          </Link>
          <div className={styles.category_box}>
            <Link href={'/products?category=women%27s%20clothing'}>
              <Image
                src="/tshirt.png"
                width={50}
                height={50}
                alt="t hisrt logo"
              />
              <h1>Womens Clothing</h1>
            </Link>
          </div>
          <div className={styles.category_box}>
            <Link href={'products?category=electronics'}>
              <Image
                src="/responsive.png"
                width={50}
                height={50}
                alt="t hisrt logo"
              />
              <h1>Electronics</h1>
            </Link>
          </div>
          <div className={styles.category_box}>
            <Link href={'products?category=jewelrys'}>
              <Image
                src="/necklace.png"
                width={50}
                height={50}
                alt="t hisrt logo"
              />
              <h1>Jewelrys</h1>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
