const express = require("express");
const puppeteer = require("puppeteer");
const app = express();

// Task: 1. launch a brower 2. goto the url 3. generate a pdf 4. close browser

app.get("/pdf", async (req, res) => {

  const url = req.query.target;

  const browser = await puppeteer.launch({
    headless: true
  });

  const webPage = await browser.newPage();
  
  
  // networkidle0, Puppeteer waits until there are 
  // no new network connections within the last 500 ms
  // it indicates the site has finished loading.
  await webPage.goto(url, {
    waitUntil: "networkidle0"
  });
  
  const pdf = await webPage.pdf({
    printBackground: true,
    path: 'output/webpage.pdf',
    format: "Letter",
    margin: {
      top: "20px",
      bottom: "40px",
      left: "20px",
      right: "20px"
    }
  })
  
  await browser.close();

  res.contentType("application/pdf");
  res.send(pdf);

});

app.listen(3000, () => {
  console.log("Server started.");
});