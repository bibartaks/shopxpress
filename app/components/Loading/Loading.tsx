import React from 'react'
import styles from './loading.module.scss'

export default function Loading() {
  return (
    <div className={styles.loading}>
      <div className={styles.loading_image}></div>
      <div className={styles.loading_title}></div>
      <div className={styles.category}></div>
      <div className={styles.price}></div>
    </div>
  )
}
