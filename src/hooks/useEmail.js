import React, { useEffect } from "react";
import emailjs, { init } from "emailjs-com";
import useAuth from "./useAuth";

export default function useEmail() {
  useEffect(() => {
    init("user_CEhllCTmXmnbP2vdGjvTD");
  }, []);
  function sendEmail(data) {
    emailjs
      .send(
        "service_vmzh60l",
        "template_1mZp81Q7",
        data,
        "user_CEhllCTmXmnbP2vdGjvTD"
      )
      .then(
        function (response) {
          console.log("response.status, response.text");
        },
        function (err) {
          console.log(err);
        }
      );
  }
  return { sendEmail };
}
