import React, { useEffect, useState, useRef, useCallback } from "react";
import styles from "./SellForm.module.scss";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import Layout from "src/components/Primary-layout";
import useUploader from "../../hooks/upload.hook.js";
import SellForm from "@/components/Sell-Form";
import ImageViewer from "@/components/Image-Viewer";
import Selector from "src/components/select";

export default function sell_form() {
  const { upload, fetchedFiles, saveOnDb, Uploaded, images, uploadError } =
    useUploader();
  const [category, setCat] = useState("none");
  const [location, setLocation] = useState("none");
  const deleteFromFirebase = (url) => {};
useEffect(() => {
 console.log(uploadError)
}, [uploadError])
  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2 }}
        className={styles.mainContainer}
      >
        <Selector data={[{ label: "emi" }]} label="Category" id={1} />
        <Selector data={[{ label: "emi" }]} label="Location" id={2} />
        <div>
          <motion.h5
            className={styles.sellProduct_label}
            initial={{ opacity: 0, y: -200 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Sell product
          </motion.h5>

          <ImageViewer
            downloadedUrls={fetchedFiles}
            handleDelete={(url) => deleteFromFirebase(url)}
            Uploaded={Uploaded}
            images={images}
            uploadError={uploadError}
          />
          <SellForm
            upload={upload}
            fetchedFiles={fetchedFiles}
            saveOnDb={saveOnDb}
            category={category}
            location={location}
          ></SellForm>
        </div>
      </motion.div>
    </Layout>
  );
}
