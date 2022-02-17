import emailjs, { init } from "emailjs-com";

export async function sendEmail(data) {
  await init("user_CEhllCTmXmnbP2vdGjvTD");
  emailjs
    .sendForm(
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
