import styles from './/footer.module.scss'

export default function Footer() {
  return (
    <footer id={styles.footer}>
      <div className={styles.footer_container}>
        <div className={styles.links}>
          <p>About</p>
          <p>Store locator</p>
          <p>News</p>
          <p>FAQs</p>
          <p>Contact Us</p>
          <p>Track Order</p>
        </div>
        <div className={styles.logo}>
          <h3>© 2024 ShopXPress All Rights Reserved</h3>
        </div>
      </div>
    </footer>
  )
}
