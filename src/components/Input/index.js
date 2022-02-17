import React, { useState } from "react";
import styles from "./input.module.scss";
import { Alert } from "react-bootstrap";

export default function Input({
  required = true,
  error,
  noMargin,
  handleChange,
  touched,
  errors,
  label,
  onFocus,
  id,
  name,
  ...props
}) {
  const [focus, setFocus] = useState(false);
  return (
    <div className={styles.container}>
      <label>{label}</label>
      {label !== "Description" ? (
        <input
          className={styles.input}
          style={{
            borderColor: error && "red",
            backgroundColor: focus && "white",
            margin: noMargin && 0,
          }}
          onBlur={() => setFocus(false)}
          onChange={handleChange}
          type="text"
          id={id}
          name={name}
          {...props}
        />
      ) : (
        <textarea
          className={styles.input}
          style={{ minHeight: "140px" }}
          placeholder={label}
          type="textInput"
          onChange={handleChange}
          label={label}
          id={id}
          name={name}
        ></textarea>
      )}

      {touched && errors ? (
        <Alert style={{ padding: 0 }} variant="danger" className="error">
          {errors}
        </Alert>
      ) : null}
    </div>
  );
}
