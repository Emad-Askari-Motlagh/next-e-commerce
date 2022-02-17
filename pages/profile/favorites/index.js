import React, { useState, useEffect } from "react";

import Layout from "src/components/Primary-layout";

import styles from "./favorites.module.scss";
import useAuth from "src/hooks/useAuth";

// import ProductCard from "@/components/ProductCard/product-card";

export default function Favorites() {
  const [products, setProducts] = useState();
  const [loading, setLoading] = useState(true);

  const { user, loading: userLoading } = useAuth();

  return (
    <Layout noCategories>
      <main className={styles.container}>
        <h1 className={styles.title}>My Favorites</h1>
        <div className={styles.content}>
          {/* <div className={styles.products}>
            {products?.map((product) => {
              return (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  brand={product.brand}
                  name={product.product_name}
                  image={product.cover_photo}
                  price={product.price}
                  sale_price={product.sale_price}
                  favorite={user?.favorites?.includes(product.id)}
                />
              );
            })}
          </div> */}
        </div>
      </main>
    </Layout>
  );
}
