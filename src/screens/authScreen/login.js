import React, { useCallback, useEffect, useRef, useState } from "react"
import Link from "next/link"
import styles from "./auth.module.scss"
import { IoIosArrowRoundBack } from "react-icons/io"
import { googleAuth, facebookAuth } from "@/actions/authActions"
import { motion } from "framer-motion"
import Header_animations from "@/components/Framer-Helpers/Header_animations"
import * as yup from "yup"
import { Alert } from "react-bootstrap"
import { useFormik } from "formik"
import { FcGoogle } from "react-icons/fc"
import { ImFacebook2 } from "react-icons/im"
import Input from "@/components/Input"
import { useProvideAuth } from "src/hooks/useAuth"
// import * as Realm from "realm-web"
import * as Realm from "realm-web"
import { App as RealmApp, Credentials } from "realm-web"
import Head from "next/head"
import { handleAuthRedirect } from "realm-web"
import { useRouter } from "next/router"
// const app = new RealmApp({ id: "realmwebtestapp-ybnna" });
const app = new RealmApp({
  id: "shopia-uosya",
})

export default function Login() {
  const [error, setError] = useState(null)
  const router = useRouter()
  const { signInError, user, dispatch, signUser } = useProvideAuth()

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
      email: "",
      password: "",
    },
    validationSchema: yup.object().shape({
      email: yup
        .string()
        .email("Invalid email address")
        .required("Please enter email"),
      password: yup.string().required("Please enter password"),
    }),
    async onSubmit(values) {
      console.log(values)
      try {
        try {
          const data = await signUser(values.email, values.password)
          router.reload()
        } catch (err) {
          console.log(err)
        }
      } catch (err) {
        console.log(err.message)
      }
    },
    validateOnMount: true,
  })
  const responseGoogle = (response) => {
    console.log(response)
  }

  async function LoginWithGoogle() {
    // Redirect Uri : <AppDomain>/redirect
    const RedirectUri = "https://rent-app-emad.herokuapp.com/auth/login"
    const credentials = Realm.Credentials.google(RedirectUri)
    app.logIn(credentials).then((user) => {
      console.log("signed in successfully with id:" + user.id)
    })
  }
  useEffect(() => {
    handleAuthRedirect()
  }, [])
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: -200 }}
        animate={{ opacity: 1, y: 0 }}
        className={styles.loginfirstdiv}
      >
        <div className="g-signin2" data-onsuccess="onSignIn"></div>
        <div>
          <IoIosArrowRoundBack size={42}></IoIosArrowRoundBack>
          <Link href="/">Home</Link>
        </div>
        <Header_animations text="Login " />

        <form
          onSubmit={handleSubmit}
          onFocus={() => setError(null)}
          style={{ marginBottom: "4rem", width: "80%" }}
        >
          <Input
            required={true}
            error={errors}
            touched={touched}
            noMargin={false}
            handleChange={handleChange}
            placeholder="Email"
            name="email"
            id="email"
            type="email"
            touched={touched.email}
            errors={errors.email}
            label="Username"
            onFocus={setErrors}
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

          <button className={styles.submitForm} type="submit">
            Submit
          </button>
        </form>

        <div className={styles.forgotPassword_div}>
          <Link href="/auth/resetpass">
            <a>Do you forgot your password?</a>
          </Link>
        </div>
        <div className={styles.login_alternatives_container}>
          {/* <GoogleLogin
          clientId="1013923348052-pf7d34p14635fqr69dqjjeg832hq68kr.apps.googleusercontent.com"
          buttonText="Login"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={"single_host_origin"}
        /> */}

          <span onClick={LoginWithGoogle} className={styles.auth_buttons}>
            <FcGoogle style={{ marginRight: "4%" }} icon="google"></FcGoogle>
            Signin with Google
          </span>
          <span
            onClick={() => dispatch(facebookAuth())}
            className={styles.auth_buttons}
          >
            <ImFacebook2
              style={{ marginRight: "4%" }}
              color="blue"
              icon="apple"
            ></ImFacebook2>
            Signin Facebook
          </span>
        </div>
        {signInError ? (
          <Alert variant="danger" className={styles.error_message}>
            {signInError}
          </Alert>
        ) : (
          user && (
            <Alert variant="success" className={styles.succeced_message}>
              {"Login Successed"}
            </Alert>
          )
        )}

        <Link href="/auth/register">
          <a className={styles.account_recomendation}>
            Dont you have an account?
            <h3>Register now</h3>
          </a>
        </Link>
      </motion.div>
    </>
  )
}
