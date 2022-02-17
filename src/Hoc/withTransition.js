import { motion } from "framer-motion";
import styles from "./withTransition.module.scss";

const withTransition = (OriginalComponent) => {
  return () => (
    <>
      <OriginalComponent />
      <motion.div
        className={styles.slide_in}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 0 }}
        exit={{ scaleX: 1 }}
        transition={{ duration: 0.7, ease: "easeInOut" }}
      />
      <motion.div
        className={styles.slide_out}
        initial={{ scaleX: 1 }}
        animate={{ scaleX: 0 }}
        exit={{ scaleX: 0 }}
        transition={{ duration: 0.7, ease: "easeInOut" }}
      />
    </>
  );
};

export default withTransition;
