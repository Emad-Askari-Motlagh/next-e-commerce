import React from "react"
import StripePayment from "@/components/Stripe"
import Layout from "src/components/Primary-layout"

export default function payment() {
  return (
    <Layout>
      <StripePayment />
    </Layout>
  )
}
