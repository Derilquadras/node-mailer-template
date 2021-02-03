const express = require("express");
const nodemailer = require("nodemailer");
const hbs = require("nodemailer-express-handlebars");
const dotenv = require("dotenv");
const app = express();
const path = require("path");
dotenv.config();

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL,
    pass: process.env.PASS,
  },
});

const handlebarOptions = {
  viewEngine: {
    extName: ".handlebars",
    partialsDir: path.resolve(__dirname, "templates"),
    defaultLayout: false,
  },
  viewPath: path.resolve(__dirname, "templates"),
  extName: ".handlebars",
};
transporter.use("compile", hbs(handlebarOptions));
let mailOptions = {
  from: "person1@gmail.com",
  to: "person2@gmail.com",
  subject: "handlebars",
  text: "Attachments and templates have been used in this project",
  attachments: [
    {
      filename: "hack.jpeg",
      path: "./hack.jpeg",
    },
  ],
  template: "index",
};

transporter
  .sendMail(mailOptions)
  .then(function (response) {
    console.log("Email sent");
  })
  .catch(function (error) {
    console.log("Error", error);
  });

app.listen(3000, () => console.log("listening on port 3000"));
