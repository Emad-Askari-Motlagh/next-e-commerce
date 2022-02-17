import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import styles from "./auth.module.scss";
import { IoIosArrowRoundBack } from "react-icons/io";
import { signUser, delet_user } from "@/actions/authActions";
import { motion } from "framer-motion";
import Header_animations from "@/components/Framer-Helpers/Header_animations";

export default function deletUser() {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [secoundPass, setSecoundPass] = useState(null);
  const [error, setError] = useState(null);
  const [loginSuccesed, setLoginSuccesed] = useState(null);
  const [pm, setPm] = useState("Log in form");
  const [verifyError, setVerifyError] = useState(null);
  const dispatch = useDispatch();
  const sign = signUser(dispatch);
  const { errorMessage } = useSelector((state) => state.errorState);

  const [show, setShow] = useState(false);

  async function formSubmit(e) {
    e.preventDefault();
    await dispatch(delet_user(username, password));
  }

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
      <Header_animations text="Please enter your password for deleting the account" />
      <div></div>

      <form onFocus={() => setError(null)}>
        <div className={styles.input_container} onFocus={() => setError(null)}>
          <h5>Username</h5>

          <input
            onFocus={() => setError(null)}
            className={styles.logininputs}
            onClick={() => focus()}
            name="username"
            placeholder="username"
            type="text"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className={styles.input_container}>
          <h5>Password</h5>

          <input
            className={styles.logininputs}
            name="password"
            placeholder="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className={styles.input_container}>
          <h5>Repeat password</h5>

          <input
            className={styles.logininputs}
            name="Repeat password"
            placeholder="Repeat password"
            type="password"
            onChange={(e) => setSecoundPass(e.target.value)}
          />
        </div>
      </form>
      <div className={styles.forgotPassword_div}>
        <Link href="/resetpass">
          <a>Do you forgot your password?</a>
        </Link>
      </div>
      <button className={styles.submitForm} onClick={formSubmit} type="submit">
        Delete
      </button>
      {error ? (
        <h5 className={styles.error_message}>{error}</h5>
      ) : (
        <h5 className={styles.succeced_message}>{loginSuccesed}</h5>
      )}
    </motion.div>
  );
}
