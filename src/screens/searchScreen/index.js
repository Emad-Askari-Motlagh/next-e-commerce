import React, { useCallback, useEffect, useState } from "react"
import Head from "next/head"
import styles from "./search.module.scss"
import Layout from "@/components/Primary-layout"
import ProductsCard from "@/components/products-Card"
import SearchForm from "@/components/Search-Form"
import { useRouter } from "next/router"
import { useDispatch, useSelector } from "react-redux"
import SearchSuggestions from "@/components/Search-Suggestion"
import SearchHeaders from "@/components/Search-Headers"
import useAuth from "src/hooks/useAuth"
import useFilter from "src/hooks/filter.hook"
import useProduct from "src/hooks/product.hook"
import SearchHistory from "@/components/Search-History"

export default function SearchPage({ data }) {
  const { user } = useAuth()
  const {
    products,
    loading,
    setSearchKeyword,
    suggestionList,
    searchKeyword,
    historys,
    submitHistory,
  } = useProduct()

  const Router = useRouter()
  const { location, category } = useFilter()
  const [input, setInput] = useState("")
  const [showSuggestion, setShowSuggestion] = useState(false)
  // const { search, slug, category, location } = Router.query

  const pushToRoute = (value) => {
    Router.push(
      {
        query: { category, searchKeyword: value, location },
      },
      {},
      { shallow: true }
    )
  }

  useEffect(() => {
    setInput(Router.query.searchKeyword)
  }, [Router, category])

  const inputChange = (e) => {
    setInput(e.target.value)
    if (e.target.value) {
      setShowSuggestion(true)
      setSearchKeyword(e.target.value)
    }
  }

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault()
      pushToRoute(input)
      setShowSuggestion(false)
      setInput(input)
    },
    [input]
  )

  const submitSuggestion = (res) => {
    setInput(res)
    setShowSuggestion(false)
    pushToRoute(res)
  }

  return (
    <Layout>
      <div className={styles.container}>
        <Head>
          <title>Create Next App</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className={styles.main}>
          <SearchForm
            handleSubmit={handleSubmit}
            handleChange={inputChange}
            inputPlaceholder="Search Your Product"
            input={input}
          >
            {showSuggestion && input ? (
              <SearchSuggestions
                handleClick={(res) => submitSuggestion(res)}
                data={suggestionList}
                searchKeyword={searchKeyword}
              />
            ) : (
              <SearchHistory data={historys} submitHistory={submitHistory} />
            )}
          </SearchForm>

          <SearchHeaders
            input={input}
            filters={{ location, category }}
            length={products?.length ?? 0}
          />
          <div className={styles.products}>
            {products?.length ? (
              products.map((product) => {
                return (
                  <ProductsCard
                    key={product._id}
                    id={product._id}
                    name={product?.name}
                    image={product?.image}
                    price={product.price}
                    category={product?.category}
                  />
                )
              })
            ) : !loading ? (
              <span className={styles.product_not_found}>
                OBS! No product found
              </span>
            ) : null}
          </div>
        </main>
      </div>
    </Layout>
  )
}
