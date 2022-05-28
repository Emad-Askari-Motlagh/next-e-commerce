import React, { useEffect, useState, useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"
import Link from "next/link"
import styles from "./auth.module.scss"
import { IoIosArrowRoundBack } from "react-icons/io"
import { motion } from "framer-motion"
import { useRouter } from "next/router"
import { FcGoogle } from "react-icons/fc"
import { ImFacebook2 } from "react-icons/im"
import { setUser } from "@/actions/authActions"
import * as yup from "yup"
import { Alert } from "react-bootstrap"
import { useFormik, ErrorMessage } from "formik"
import Header_animations from "@/components/Framer-Helpers/Header_animations"
import Input from "@/components/Input"

export default function signup() {
  const [error, setError] = useState(null)
  const dispatch = useDispatch()
  const { signupError } = useSelector((state) => state.errorState)
  const router = useRouter()
  const [loginSuccesed, setLoginSuccesed] = useState(null)
  // const loginWithGoogle = dispatch(googleAuth);
  // const loginWithFacebook = dispatch(facebookAuth);

  const { handleChange, handleSubmit, values, touched, errors } = useFormik({
    initialValues: {
      email: "",
      password: "",
      Repeat_password: "",
      name: "",
    },
    validationSchema: yup.object().shape({
      email: yup
        .string()
        .email("Invalid email address")
        .required("Please enter email"),
      password: yup.string().required("Please enter password"),
      Repeat_password: yup
        .string()
        .required("Please enter password")
        .oneOf([yup.ref("password"), null], "Passwords must match"),
      name: yup.string().required("Please enter a name"),
    }),
    onSubmit: ({ email, password, name }) => {
      try {
        dispatch(setUser(email, password, name))
        router.push("/")
      } catch (err) {
        if (err && err.type === "duplicate") {
          router.push("/auth/login")
        }
        console.log(err)
      }
    },
  })

  return (
    <motion.div
      initial={{ opacity: 0, y: -200 }}
      animate={{ opacity: 1, y: 0 }}
      className={styles.loginfirstdiv}
    >
      <div>
        <IoIosArrowRoundBack size={42}></IoIosArrowRoundBack>
        <Link href="/">Home</Link>
      </div>
      <Header_animations text="Signup Form " />

      <form
        onSubmit={handleSubmit}
        onFocus={() => setError(null)}
        style={{ marginBottom: "4rem", width: "80%" }}
      >
        <Input
          required={true}
          noMargin={false}
          handleChange={handleChange}
          placeholder="Email"
          name="email"
          id="email"
          touched={touched.email}
          errors={errors.email}
          label="Email"
        />

        <Input
          required={true}
          noMargin={false}
          handleChange={handleChange}
          placeholder="Password"
          name="password"
          id="password"
          type="password"
          touched={touched.password}
          errors={errors.password}
          label="Password"
        />

        <Input
          required={true}
          noMargin={false}
          handleChange={handleChange}
          placeholder="Repeat_password"
          name="Repeat_password"
          id="Repeat_password"
          type="password"
          touched={touched.Repeat_password}
          errors={errors.Repeat_password}
          label="Repeat the Password"
        />

        <Input
          required={true}
          noMargin={false}
          handleChange={handleChange}
          placeholder="Name"
          name="name"
          id="name"
          touched={touched.name}
          errors={errors.name}
          label="Name"
        />

        <button className={styles.submitForm} type="submit">
          Submit
        </button>
      </form>

      <div className={styles.forgotPassword_div}>
        <Link href="/resetpass">
          <a>Do you forgot your password?</a>
        </Link>
      </div>
      <div className={styles.login_alternatives_container}>
        <span onClick={() => null} className={styles.auth_buttons}>
          <FcGoogle style={{ marginRight: "4%" }} icon="google"></FcGoogle>
          Signup With Google
        </span>
        <span onClick={() => null} className={styles.auth_buttons}>
          <ImFacebook2
            style={{ marginRight: "4%" }}
            color="blue"
            icon="apple"
          ></ImFacebook2>
          Signup With Facebook
        </span>
      </div>
      {error ? (
        <Alert variant="danger" className={styles.error_message}>
          {error}
        </Alert>
      ) : (
        loginSuccesed && (
          <Alert variant="success" className={styles.succeced_message}>
            {loginSuccesed}
          </Alert>
        )
      )}

      <Link href="/auth/signup">
        <a className={styles.account_recomendation}>
          Dont you have an account?
          <h3>Register now</h3>
        </a>
      </Link>
    </motion.div>
  )
}
