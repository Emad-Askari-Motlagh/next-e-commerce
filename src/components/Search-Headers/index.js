import React from "react";
import Button from "@/components/Filter";
import styles from "./SearchHeaders.module.scss";

export default function searchHeaders({ active, input, filters, length }) {
  return (
    <div className={styles.header}>
      <div className={styles.filtersHeaders}>
        <h1 className={styles.title}>
          Listing {length} products for
          <br /> {active && input}
        </h1>
        <h1 className={styles.title}>Category: {filters.category}</h1>
        <h1 className={styles.title}>Location: {filters.location}</h1>
      </div>
      <div className={styles.headerButtons}>
        <Button type="sort" style={{ marginRight: 20 }} />
        <Button count={0} text="Filter" type="filter" />
      </div>
    </div>
  );
}
