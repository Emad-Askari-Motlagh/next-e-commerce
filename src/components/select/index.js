import React from "react";
import AsyncSelect from "react-select/async";
import styles from "./select.module.scss";

export default function select({ data, label, id }) {
  const handleInputChange = (newValue) => {
    return null;
  };
  const filterColors = (inputValue) => {
    return data?.filter((i) =>
      i.label.toLowerCase().includes(inputValue.toLowerCase())
    );
  };

  const loadOptions = (inputValue, callback) => {
    setTimeout(() => {
      callback(filterColors(inputValue));
    }, 1000);
  };
  return (
    <div className={styles.container}>

      <pre>{label}</pre>
      <AsyncSelect
        instanceId={id}
        cacheOptions
        loadOptions={loadOptions}
        defaultOptions
        onInputChange={handleInputChange}
        inputId="test123"
        
        styles={{
          control: (styles) => ({
            ...styles,
            backgroundColor: "white",
            borderRadius: "20px",
          }),
        }}
      ></AsyncSelect>
    </div>
  );
}
