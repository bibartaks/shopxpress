import React from 'react'
import styles from './product_item_loading_skeleton.module.scss'

export default function ProductItemLoadingSkeleton() {
  return (
    <div id={styles.product_item}>
      <div className={styles.product_item_container}>
        <div className={styles.image_content}>
          <div className={styles.image}></div>
        </div>
        <div className={styles.text_content}>
          <h1 className={styles.title}></h1>
          <h1 className={styles.category}></h1>
          <h1 className={styles.price}></h1>
          <h1 className={styles.desc}></h1>
          <h1 className={styles.cart_btn}></h1>
        </div>
      </div>
    </div>
  )
}
