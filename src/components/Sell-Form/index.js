import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Button, InputGroup, FormFile } from "react-bootstrap";
import { v4 as uuid } from "uuid";
import Filter from "src/components/Filter";
import { Alert } from "react-bootstrap";
import { useFormik } from "formik";
import * as yup from "yup";
import styles from "./sellForm.module.scss";
import { useSelector } from "react-redux";
import Input from "@/components/Input";
import useAuth from "src/hooks/useAuth";

export default function SellForm({
  upload,
  fetchedFiles,
  saveOnDb,
  category,
  location,
}) {
  const { user } = useAuth();
  const [files, allFiles] = useState([]);
  // const filters = useSelector((state) => state.filtersState);

  const { handleChange, handleSubmit, touched, errors } = useFormik({
    initialValues: {
      productName: "",
      description: "",
      price: "",
    },

    validationSchema: yup.object().shape({
      productName: yup.string().required("Please enter the product name"),

      price: yup.string().required("Please enter the price"),
      description: yup
        .string()
        .required("Please Describe ypur product")
        .min(6, "Att least 6"),
    }),
    onSubmit(values) {
      saveOnDb(
        values.productName,
        values.price,
        values.description,
        4,
        "kkkk",
        category
      );
    },
  });
  async function handleChangeFile(e) {
    const file = await e.target.files[0];
    allFiles(file);
    upload(file);
  }

  return (
    <>
      <form onSubmit={handleSubmit} className={styles.sell_form}>
        <label htmlFor="fileInput" className={styles.input_dives_file}>
          choose image...
        </label>

        <input
          className={styles.inputfile}
          type="file"
          id="fileInput"
          name="file"
          multiple
          onChange={handleChangeFile}
        />
        {/* {files.length &&
          files.map((res) => {
            return (
              <img
                style={{ width: "100px", height: "100px" }}
                src={URL.createObjectURL(res)}
              ></img>
            );
          })} */}

        <div className={styles.input_dives}></div>

        <Input
          required={true}
          noMargin={false}
          handleChange={handleChange}
          placeholder="Product Name"
          name="productName"
          id="productName"
          touched={touched.productName}
          errors={errors.productName}
          label="Product Name"
        />

        <Input
          required={true}
          noMargin={false}
          handleChange={handleChange}
          placeholder="Price"
          name="price"
          id="price"
          touched={touched.price}
          errors={errors.price}
          label="Price"
        />
        <Input
          required={true}
          noMargin={false}
          handleChange={handleChange}
          placeholder="Description"
          name="description"
          id="description"
          touched={touched.description}
          errors={errors.description}
          label="Description"
        />

        <Button className={styles.form_submit} type="submit">
          submit
        </Button>
      </form>
    </>
  );
}
