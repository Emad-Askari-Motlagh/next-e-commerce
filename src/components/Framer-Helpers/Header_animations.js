import React from "react";
import { motion } from "framer-motion";
import styles from "./framer.module.css";

export default function Header_animations({ text }) {
  return (
    <motion.div
      className={styles.header}
      initial={{ y: -200 }}
      animate={{ opacity: 1, y: 0 }}>
      {text}
      <motion.div
        className={styles.underline}
        initial={{ y: -200 }}
        animate={{ opacity: 1, y: 0 }}></motion.div>
    </motion.div>
  );
}
