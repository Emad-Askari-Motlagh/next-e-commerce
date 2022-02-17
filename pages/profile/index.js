import React, { useState } from "react";
import * as yup from "yup";
import useAuth from "src/hooks/useAuth";
import styles from "./account.module.scss";
import Layout from "src/components/Primary-layout";
import { updateUser } from "@/actions/authActions";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import Input from "@/components/Input";
import ErrorPage from "../404";
export default function AccountPage() {
  const [errors2, setErrors2] = useState({});
  const [passwordError, setError] = useState(null);
  let [photo, setPhoto] = useState("ok");
  const dispatch = useDispatch();
  const { user, loading, userObject } = useAuth();
  const {
    handleChange,
    handleSubmit,
    values,
    touched,
    errors,
    handleBlur,
    setErrors,
  } = useFormik({
    initialValues: {
      username: "",
      name: "",
      surname: "",
      phoneNumber: "",
      photo,
    },
    validationSchema: yup.object().shape({
      name: yup
        .string()
        .required("* Name is required.")
        .min(2, "* Name is too short"),
      surname: yup
        .string()
        .required("* Surname is required.")
        .min(2, "* Surname is too short"),
      username: yup.string().required("* Email is required."),
      phoneNumber: yup
        .string()
        .notRequired()
        .matches(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/g, {
          message: "Invalid Phone Number",
          excludeEmptyString: true,
        }),
    }),

    onSubmit(values) {
      dispatch(
        updateUser({
          id: userObject.user.id,
          username: values.username,
          name: values.name,
          surname: values.surname,
          phoneNumber: values.phoneNumber,
          photo: values.photo,
        })
      );
    },
  });

  const changePassword = ({ currentPassword, newPassword }) => {
    const { reauth, update } = updatePassword({ currentPassword, newPassword });

    reauth()
      .then(() =>
        update()
          .then(() => setError("Password Changed!"))
          .catch((e) => setError(e.message))
      )
      .catch((e) => setError(e.message));
  };
  if (!user) {
    return <ErrorPage />;
  }
  return (
    <Layout noCategories>
      <main className={styles.container}>
        <h1 className={styles.title}>My Account</h1>
        <div className={styles.content}>
          <div className={styles.accountContainer}>
            <h4>Account Details</h4>
            <form
              key="account-form"
              onSubmit={handleSubmit}
              onFocus={() => setError(null)}
            >
              <div className={styles.inputContainer}>
                <Input
                  required={true}
                  error={errors}
                  touched={touched}
                  noMargin={false}
                  handleChange={handleChange}
                  placeholder="Email"
                  name="username"
                  id="username"
                  type="email"
                  touched={touched.username}
                  errors={errors.username}
                  label="Username"
                  onFocus={setErrors}
                />
              </div>
              <div className={styles.inputContainer}>
                <Input
                  required={true}
                  error={errors}
                  touched={touched}
                  noMargin={false}
                  handleChange={handleChange}
                  placeholder="Name"
                  name="name"
                  id="name"
                  type="text"
                  touched={touched.name}
                  errors={errors.name}
                  label="Name"
                  onFocus={setErrors}
                />
              </div>
              <div className={styles.inputContainer}>
                <Input
                  required={true}
                  error={errors}
                  touched={touched}
                  noMargin={false}
                  handleChange={handleChange}
                  placeholder="Surname"
                  name="surname"
                  id="surname"
                  type="text"
                  touched={touched.surname}
                  errors={errors.surname}
                  label="Surname"
                  onFocus={setErrors}
                />
              </div>
              <div className={styles.inputContainer}>
                <Input
                  required={true}
                  error={errors}
                  touched={touched}
                  noMargin={false}
                  handleChange={handleChange}
                  placeholder="Phone number"
                  name="phoneNumber"
                  id="phoneNumber"
                  type="text"
                  touched={touched.phoneNumber}
                  errors={errors.phoneNumber}
                  label="Phone NUmber"
                  onFocus={setErrors}
                />
              </div>

              <button type="submit" name="update_button" value="Update">
                Update
              </button>
            </form>
          </div>
          <hr />
          <div className={styles.passwordContainer}>
            <h4>Change Password</h4>
            <form key="password-form">
              <div className={styles.inputContainer}>
                <span>Current Password</span>
                <input name="currentPassword" placeholder="Current Password" />
              </div>
              <div className={styles.inputContainer}>
                <span>New Password</span>
                <input name="newPassword" placeholder="New Password" />
              </div>
              {errors2?.newPassword && (
                <span style={{ color: "red", marginTop: 4, fontSize: 14 }}>
                  {errors2?.newPassword.message}
                </span>
              )}
              <div className={styles.inputContainer}>
                <span>Confirm New Password</span>
                <input
                  name="confirmPassword"
                  placeholder="Confirm New Password"
                />
              </div>
              {errors2?.confirmPassword && (
                <span style={{ color: "red", marginTop: 4, fontSize: 14 }}>
                  {errors2?.confirmPassword.message}
                </span>
              )}
              {passwordError && (
                <span
                  style={{
                    color:
                      passwordError === "Password Changed!" ? "black" : "red",
                    marginTop: 4,
                    fontSize: 14,
                  }}
                >
                  {passwordError}
                </span>
              )}
              <button
                type="submit"
                name="password_button"
                value="Change Password"
              >
                Confirm
              </button>
            </form>
          </div>
        </div>
      </main>
    </Layout>
  );
}
