import React, { useEffect, useState } from "react";
import styles from "./ImageViewer.module.scss";
import Image from "next/image";
import Lottie from "react-lottie-player";
import { AiFillCloseCircle } from "react-icons/ai";
import lottieJson from "../../../public/spiner_lottie.json";

export default function imageViewer({ handleDelete, images, uploadError }) {
  return (
    <div className={styles.sell_image_container}>
      {images?.length ? (
        images.map((res, inde) => {
          return (
            <div id={"emi"} key={res.name} className={styles.image_outer_div}>
              {images.id && (
                <AiFillCloseCircle
                  color="tomato"
                  size={29}
                  onClick={() => handleDelete(res.name)}
                  className={styles.deleteImageIcon}
                />
              )}
              {!images?.length ? (
                <Lottie
                  loop
                  animationData={lottieJson}
                  play
                  style={{ width: 150, height: 150, margin: "auto" }}
                />
              ) : (
                <div>
                  <img
                    src={`https://storage.googleapis.com/ecommerce-next/${res.name}`}
                    width={100}
                    height={100}
                  ></img>
                  {uploadError && <span>{uploadError}</span>}
                </div>
              )}
            </div>
          );
        })
      ) : (
        <img
          style={{ margin: "auto" }}
          src={`/instagram-logo.svg`}
          width={100}
          height={100}
        ></img>
      )}
    </div>
  );
}
