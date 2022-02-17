import { useRouter } from "next/router";
import { useProvideAuth } from "src/hooks/useAuth";
import useProductByName from "src/hooks/product.hook";
import Button from "@/components/Filter";
import Layout from "@/components/Primary-layout";
import Head from "next/head";
import SearchForm from "@/components/Search-Form";
import ProductCard from "@/components/products-Card";
import { useState } from "react";
import styles from "./Location.module.scss";

const getEmoji = {
  clothing: "👚",
  shoes: "👠",
  accessories: "👜",
  activewear: "🤸",
  gifts_and_living: "🎁",
  inspiration: "💎",
};

export default function Location({ data, location }) {
  const { user, loading } = useProvideAuth();
  const Router = useRouter();
  const formattedName = () => {
    const cat = Router.query?.location;
    const firstLetter = Router.query?.location.charAt(0).toUpperCase();
    return Router.query?.location.replace(cat.charAt(0), firstLetter);
  };

  const [gotenProduct, fetchInput, loaded] = useProductByName();
  const [searchInput, setInput] = useState("");
  const [submitedSuggestion, setSubmittedSuggestion] = useState("");

  return (
    <Layout>
      <div className={styles.container} style={{ position: "relative" }}>
        <Head>
          <title>Category</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <button
          onClick={() => Router.push({ query: { location: "Gothenburg" } })}
        >
          search
        </button>
        <main className={styles.main}>
          <SearchForm gotenProduct={gotenProduct} />
          <div className={styles.header}>
            <h1 className={styles.title}>
              <span className={styles.emoji}>
                {getEmoji[Router.query.category]}
              </span>
              {formattedName()}
            </h1>
            <div className={styles.headerButtons}>
              <Button type="sort" />
              <Button count={0} />
            </div>
          </div>

          <div className={styles.products}>
            {!loading &&
              JSON.parse(data).map((product) => {
                return (
                  <ProductCard
                    key={product.id}
                    id={product.id}
                    name={product.text}
                    image={product.images[0]}
                    category={product.category}
                    price={product.price}
                    createdAt={product.createdAt.seconds * 1000}
                    location={product.location}
                  />
                );
              })}
          </div>
        </main>
      </div>
    </Layout>
  );
}
