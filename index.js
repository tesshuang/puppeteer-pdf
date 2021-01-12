const express = require("express");
const puppeteer = require("puppeteer");
const app = express();

app.listen(3000, () => {
  console.log("Server started.");
});