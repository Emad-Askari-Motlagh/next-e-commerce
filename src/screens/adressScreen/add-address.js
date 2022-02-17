import React, { useState, useEffect } from "react";
import * as yup from "yup";
import styles from "./add.module.scss";
import { useFormik, ErrorMessage } from "formik";
import { useDispatch, useSelector } from "react-redux";

export default function AddAddress({ closeEvent }) {
  const { user, loading } = useAuth();
  const dispatch = useDispatch();

  const { handleChange, handleSubmit, values, touched, errors } = useFormik({
    initialValues: {
      title: "",
      city: "",
      region: "",
      zipcode: "",
      full_address: "",
    },
    validationSchema: yup.object().shape({
      title: yup
        .string()
        .required("* Title is required.")
        .min(2, "* Title is too short"),
      city: yup
        .string()
        .required("* City is required.")
        .min(2, "* City is too short"),
      region: yup.string().required("* Region is required."),
      zipcode: yup.string().required("* Zip Code is required."),
      full_address: yup.string().required("* Address Line is required."),
    }),
    onSubmit: (values) => {
      // user && dispatch(addAddress({ id: user.uid, ...values }));
    },
  });
  const closeModal = (target) => {
    target?.id === "container" && closeEvent();
  };

  return (
    <div
      className={styles.container}
      id="container"
      onClick={(e) => closeModal(e.target)}
    >
      <div className={styles.content}>
        <div className={styles.header}>
          <h4>Add New Address</h4>
          <div onClick={closeEvent}>×</div>
        </div>
        <hr />
        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", paddingTop: 30 }}
        >
          <div className={styles.inputContainer}>
            <span>Address Title</span>
            <input
              name="title"
              value={values.title}
              placeholder="Home, Office, etc."
              error={errors.title}
              onChange={handleChange}
            />
          </div>
          {touched.title && errors.title ? (
            <span style={{ color: "red", marginTop: 4, fontSize: 14 }}>
              {errors.title}
            </span>
          ) : null}

          <div className={styles.inputContainer}>
            <span>City</span>
            <input
              name="city"
              value={values.city}
              onChange={handleChange}
              placeholder="New York, London, etc."
              error={errors.city}
            />
          </div>
          {touched.city && errors.city && (
            <span style={{ color: "red", marginTop: 4, fontSize: 14 }}>
              {errors?.city}
            </span>
          )}

          <div className={styles.inputContainer}>
            <span>Region</span>
            <input
              name="region"
              placeholder="France, Italy, etc."
              error={errors?.region}
              value={values.region}
              onChange={handleChange}
            />
          </div>
          {errors.region && touched.region && (
            <span style={{ color: "red", marginTop: 4, fontSize: 14 }}>
              {errors?.region}
            </span>
          )}

          <div className={styles.inputContainer}>
            <span>Zip Code</span>
            <input
              value={values.zipcode}
              onChange={handleChange}
              name="zipcode"
              placeholder=""
              error={errors?.zipcode}
            />
          </div>
          {errors.zipcode && touched.zipcode && (
            <span style={{ color: "red", marginTop: 4, fontSize: 14 }}>
              {errors?.zipcode}
            </span>
          )}

          <div className={styles.inputContainer}>
            <span>Address Line</span>
            <input
              name="full_address"
              placeholder="123 Main Street, New York, NY 10030, etc."
              error={errors.full_address}
              value={values.full_address}
              onChange={handleChange}
            />
          </div>
          {errors.full_address && touched.full_address && (
            <span style={{ color: "red", marginTop: 4, fontSize: 14 }}>
              {errors?.full_address}
            </span>
          )}
          <button type="submit" className={styles.submitButton}>
            Add Address
          </button>
        </form>
      </div>
    </div>
  );
}
