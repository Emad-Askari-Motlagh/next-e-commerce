import React, { useEffect } from "react"
import styles from "./Search.module.scss"
import SearchIcon from "src/components/icons/search"

export default function SearchForm({
  handleChange,
  handleSubmit,
  inputPlaceholder,
  children,
  input,
}) {
  return (
    <div className={styles.shop_search}>
      <div className={styles.shop_form}>
        <div className={styles.searchContainer}>
          <SearchIcon
            width={20}
            height={20}
            fill="grey"
            className={styles.searchIcon}
          />
          <form style={{ position: "relative" }} onSubmit={handleSubmit}>
            <input
              className={styles.searchInput}
              autoCorrect="off"
              autoCapitalize="none"
              placeholder={inputPlaceholder}
              onChange={handleChange}
              type="search"
              value={input}
            />
          </form>
          {children}
        </div>
      </div>
    </div>
  )
}
