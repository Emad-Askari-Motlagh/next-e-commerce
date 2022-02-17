import React, { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { wrap } from "popmotion"
import { FiArrowRight, FiArrowLeft } from "react-icons/fi"
import styles from "./Gallery.module.scss"
import MyVerticallyCenteredModal from "@/components/Image-Selector"
import useDimension from "../../hooks/Dimensions.hook"

const variants = {
  enter: (direction) => {
    return {
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }
  },
}

const swipeConfidenceThreshold = 10000
const swipePower = (offset, velocity) => {
  return Math.abs(offset) * velocity
}

export default function Gallery({ images, setSelectedImg, small }) {
  const [dimensions, setDimensions] = useState({ width: 1920, height: 1080 })
  const [modalShow, setModalShow] = React.useState(false)
  const [[page, direction], setPage] = useState([0, 0])
  const [selected, setSelected] = useState(null)
  const imageIndex = wrap(0, images?.length, page)
  const windowSize = useDimension()

  useEffect(() => {
    if (windowSize.width === undefined) {
      return
    }
    setDimensions({ width: windowSize.width, height: windowSize.height })
  }, [windowSize])

  const paginate = (newDirection) => {
    setPage([page + newDirection, newDirection])
  }

  return (
    <div className={styles.gallery_container}>
      <MyVerticallyCenteredModal
        show={selected && modalShow}
        onHide={() => setModalShow(false)}
        src={selected}
      />
      <div style={{ display: "flex" }}>
        <div className="prev" onClick={() => paginate(-1)}>
          {small ? (
            <FiArrowLeft
              style={{ top: "50%", position: "relative" }}
              size={44}
            />
          ) : null}
        </div>
        <AnimatePresence initial={false} custom={direction}>
          <motion.img
            onClick={() => {
              setModalShow(true), setSelected(images)
            }}
            key={page}
            className={styles.bigImage}
            src={images}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x)

              if (swipe < swipeConfidenceThreshold) {
                paginate(1)
              } else if (swipe > swipeConfidenceThreshold) {
                paginate(-1)
              }
            }}
          />
        </AnimatePresence>
        <div className="next" onClick={() => paginate(1)}>
          {small ? (
            <FiArrowRight
              style={{ top: "50%", position: "relative" }}
              size={44}
            />
          ) : null}
        </div>
      </div>

      <div className={styles.smallPhotos_container}>
        {Array.isArray(images) &&
          images?.map((src, index) => (
            <div
              onClick={() => setPage([index, 1])}
              key={index}
              className={styles.smallPhotos}
            >
              <img
                style={{
                  borderColor: images[imageIndex] === src ? "red" : null,
                  zIndex: 40,
                }}
                src={src}
              />
            </div>
          ))}
      </div>
    </div>
  )
}
