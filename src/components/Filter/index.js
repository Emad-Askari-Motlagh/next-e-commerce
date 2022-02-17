import React from "react"
import styles from "./filter.module.scss"
import SortIcon from "src/components/icons/sort"
import CategorysModal from "@/components/Filters-Modal"

export default function Filter(props) {
  const [modalIsOpen, setIsOpen] = React.useState(false)

  return (
    <FilterItem modalIsOpen={modalIsOpen} setIsOpen={setIsOpen} {...props} />
  )
}

const FilterItem = ({ type, count, modalIsOpen, setIsOpen, ...props }) => {
  return (
    <div
      className={styles.container}
      {...props}
      style={{ position: "relative" }}
    >
      {/* this div is helper to make a clickable area */}
      <div
        onClick={() => type === "filter" && setIsOpen(true)}
        className={styles.fill}
      ></div>

      {type === "sort" ? (
        <SortIcon width={22} />
      ) : (
        <div onClick={() => setIsOpen(true)} className={styles.counter}>
          {count}
        </div>
      )}

      <span className={styles.text}>
        {type === "sort" ? "Sort" : props.text}
      </span>
      <CategorysModal modalIsOpen={modalIsOpen} setIsOpen={setIsOpen} />
    </div>
  )
}
