const express = require("express");

const app = express();
app.get("/payment/stripe", (req, res) => {
  res.send("YESS");
});
