import React, { useEffect } from "react"
import Product_Screen from "@/screens/productScreen"
import mongoose from "mongoose"
import dbInit from "lib/db/dbInit.js"
import Person from "../../src/models/productModel"

export default function product({ product }) {
  return <Product_Screen product={product} />
}

// export async function getServerSideProps({ params }) {
//   await dbInit()
//   const [product, emi, id] = params.product
//   const pet = await Person.findById(id).lean()
//   return { props: { product: JSON.stringify(pet) } }
// }
export async function getStaticProps({ params }) {
  try {
    await dbInit()

    const [product, name, id] = params.product
    const objectId = mongoose.Types.ObjectId(id)
    const res = await Person.findOne({
      _id: objectId,
    })

    return {
      props: {
        product: JSON.stringify(res),
        id,
        revalidate: 100,
      },
    }
  } catch (err) {
    return { notFound: true }
  }
}

export async function getStaticPaths() {
  await dbInit()

  const res = await Person.find({})
  const paths = []

  res.map((doc) => {
    const objectId = mongoose.Types.ObjectId(doc._id).toHexString()
    paths.push({
      params: {
        product: ["product", doc.name, objectId],
      },
    })
  })

  return {
    paths,
    fallback: false, // false or 'blocking'
  }
}
