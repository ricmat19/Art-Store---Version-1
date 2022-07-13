const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const { google } = require("googleapis");

//insures that the .env file is only run in a development environment and not a production environment
if (process.env.NODE_ENV !== "production") {
  //requires the the .env file configuration be run first hiding all info hidden via the .env file
  require("dotenv").config();
}

const clientId = process.env.GOOGLE_API_CLIENT_ID;
const clientSecret = process.env.GOOGLE_API_CLIENT_SECRET;
const redirectURI = process.env.GOOGLE_API_REDIRECT_URI;
const refreshToken = process.env.GOOGLE_API_REFRESH_TOKEN;

const oAuth2Client = new google.auth.OAuth2(
  clientId,
  clientSecret,
  redirectURI
);
oAuth2Client.setCredentials({ refresh_token: refreshToken });

//Get all products items of a certain type
router.post("/contact", async (req, res) => {
  try {
    const accessToken = await oAuth2Client.getAccessToken();

    const output = `
    <h3>Message Details:</h3>
    <ul>
        <li>Name: ${req.body.name}</li>
        <li>Email: ${req.body.email}</li>
        <li>Message: ${req.body.message}</li>
    </ul>`;

    const html = `
    <h3>Message Details:</h3>
    <ul>
        <li>Name: ${req.body.name}</li>
        <li>Email: ${req.body.email}</li>
        <li>Message: ${req.body.message}</li>
    </ul>`;

    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: process.env.EMAIL,
        clientId: clientId,
        clientSecret: clientSecret,
        refreshToken: refreshToken,
        accessToken: accessToken,
      },
    });

    let mailOptions = {
      from: req.body.email,
      to: process.env.EMAIL,
      subject: req.body.subject,
      text: output,
      html: html,
    };

    transporter
      .sendMail(mailOptions)
      .then(function () {
        res.sendStatus(201);
      })
      .catch(function (error) {
        console.log("Error", error);
      });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
