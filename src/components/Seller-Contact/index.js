import React from "react";
import styles from "./Contact.module.scss";
export default function index({ number, email, name, ...props }) {
  return (
    <div className={styles.container}>
      <span className={styles.number}>Sellers Number = {number}</span>
      <br />
      <span className={styles.email}>Sellers Email = {email}</span>
      <span className={styles.name}>Sellers Name = {name}</span>
      <button className={styles.messageButton}>
        Send a message to the Seller
      </button>
      {props.children}
    </div>
  );
}
