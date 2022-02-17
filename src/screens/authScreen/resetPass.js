import React, { useEffect, useRef, useState } from "react";
import styles from "./auth.module.scss";
import { resetPassword } from "@/actions/authActions";
import useAuth from "src/hooks/useAuth";
import useEmail from "src/hooks/useEmail";
import jwt from "jsonwebtoken";

export default function resetPass() {
  const [email, setEmail] = useState("");
  const [repeat_password, setRepeat_password] = useState("");
  const formRef = useRef();
  const { userObject, user } = useAuth();
  const { sendEmail } = useEmail();

  function formSubmit(e) {
    e.preventDefault();

    const token = jwt.sign(user, "MY_SECRET");
    const templateParams = {
      to: email,
      token,
      id: userObject.id,
      subject: `http://local;host:3000/auth/resetpass?emi:${token}`,
    };
    sendEmail(templateParams);
  }

  return (
    <div className={styles.loginfirstdiv}>
      <h5 style={{ fontSize: "1vw", fontWeight: "700" }}>Reset password</h5>

      <form
        ref={formRef}
        onSubmit={formSubmit}
        style={{ display: "flex", flexDirection: "column" }}
      >
        <input
          className={styles.logininputs}
          name="email"
          placeholder="email"
          type="text"
          onChange={(e) => setEmail(e.target.value)}
        />

        <br />
        <button style={{ fontSize: "1vw" }} type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}
