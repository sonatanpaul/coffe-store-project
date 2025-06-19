const express = require("express");
const cors = require("cors");
require("dotenv").config();
const port = process.env.PORT || 3000;
const app = express();

app.get("/", (req, res) => {
  res.send("Welcome To Server");
});

app.listen(port, () => {
  console.log(`Server running is ${port}`);
});
