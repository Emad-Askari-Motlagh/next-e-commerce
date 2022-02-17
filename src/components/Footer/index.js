import Link from "next/link";
import React, { useState } from "react";
import styles from "./footer.module.scss";
import { GrFacebook } from "react-icons/gr";
import { AiFillTwitterCircle } from "react-icons/ai";
import { ImMail4 } from "react-icons/im";
import router from "next/router";
import Toast from "../../toasts/Top_toast";

export default function pageTwo() {
  const [email, setEmail] = useState(null);
  const [show, setShow] = useState(false);

  return (
    <footer className={styles.pagetwocontainer}>
      <div className={styles.firstDiv}>
      <ul className={styles.page_two_ul}>
          <li>Popular</li>

          <li>Contact us</li>

          <li>Newly listed</li>

          <li>Products</li>
        </ul>
        <Toast
          setShow={setShow}
          message={"Please fill your Email"}
          show={show}
        />
        <form className={styles.signup_form}>
          <div>
            <input
              type="email"
              placeholder="Enter your email address"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button
            className={styles.signupButton}
            type='submit'
            onClick={(event) => {
              event.preventDefault()
              if (email) {
                return router.push({
                  pathname: `/auth/signup`,
                  query: { email },
                });
              } else {
                setShow(true);
              }
            }}
          >
            Signup
          </button>
        </form>
   

      </div>
  
  
      <div className={styles.ll}>
        <a href="www.google.com">
          <GrFacebook size={25} />
        </a>

        <a href="www.google.com">
          <AiFillTwitterCircle size={25} color="blue"></AiFillTwitterCircle>
        </a>

        <a href="www.google.com">
          <ImMail4 size={25} color="black" />
        </a>

        <a className={styles.term} href="/terms/terms">
          Term and Conditions
        </a>
      </div>
      <div className={styles.companyDiv}>
        <h5>Designed By alliancecodes.com</h5>
        <h5> Shopia © 2021</h5>
      </div>
    </footer>
  );
}
