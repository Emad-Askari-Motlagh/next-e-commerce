import React, { useEffect } from "react"
import styles from "./SearchSuggestion.module.scss"
import SearchIcon from "src/components/icons/search"

export default function SearchSuggestions({ data, handleClick }) {
  const selectHandle = (res) => {
    handleClick(res)
  }

  return (
    <div className={styles.suggestion_Container}>
      {data.map((res) => {
        return (
          <li className={styles.suggestion_li} key={res._id}>
            <SearchIcon
              width={20}
              height={20}
              fill="black"
              className={styles.searchIcon}
            />
            <p
              onClick={() => selectHandle(res.name)}
              className={styles.suggestionLabel}
            >
              {res.name}
            </p>
          </li>
        )
      })}
    </div>
  )
}
