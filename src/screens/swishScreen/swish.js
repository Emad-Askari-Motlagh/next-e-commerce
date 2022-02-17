import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import styles from "./payment.module.scss";
import useSwish from "src/hooks/swish.hook";
import Layout from "@/components/Primary-layout";

export default function Swish() {
  const [token, setToken] = useState();
  const { startPaymentClick, postPayment } = useSwish();
  return (
    <Layout>
      <div className={styles.swishContainer}>
        <Link href="/">Home</Link>
        <button onClick={() => postPayment(730565060, 100, "saf")}>Pay</button>
      </div>
    </Layout>
  );
}
