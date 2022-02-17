import React, { useEffect } from "react"
import styles from "./SearchSuggestion.module.scss"
import { AiOutlineHistory } from "react-icons/ai"

export default function searchHistory({ data, submitHistory }) {
  return (
    <div className={styles.suggestion_Container}>
      {data?.name?.length &&
        data.name.map((res) => {
          return (
            <li className={styles.suggestion_li} key={res}>
              <AiOutlineHistory
                width={20}
                height={20}
                fill="gray"
                className={styles.searchIcon}
              />
              <p
                onClick={() => submitHistory(res)}
                className={styles.suggestionLabel}
              >
                {res}
              </p>
            </li>
          )
        })}
    </div>
  )
}
