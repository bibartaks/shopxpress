import React from 'react'
import styles from './contact.module.scss'

export default function page() {
  return (
    <section id={styles.contact}>
      <div className={styles.contact_container}>
        <div className={styles.contact_form_content}>
          <h1>Contact Us</h1>
          <p>Contact us via contact information or submit a contact form</p>
          <form>
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" placeholder="Enter your name" />
            <label htmlFor="email">Email:</label>
            <input type="email" placeholder="Enter your email" />
            <label htmlFor="message">Message:</label>
            <textarea
              name="message"
              id="message"
              cols="30"
              rows="10"
              placeholder="Enter your message"
            ></textarea>
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </section>
  )
}
