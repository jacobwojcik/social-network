const express = require("express");
const router = express.Router();

const mongoose = require("mongoose");
const User = require("../models/user");

require("dotenv").config();

const db = process.env.DB_KEY;

mongoose.connect(
  db,
  { useUnifiedTopology: true, useNewUrlParser: true },
  (err) => {
    if (err) {
      console.log("Error :" + err);
    } else {
      console.log("Connected to database");
    }
  }
);

router.get("/", (req, res) => {
  res.send("Respond from users ROUTE");
});

router.post("/register", (req, res) => {
  let userData = req.body;
  let user = new User(userData);

  user.save((err, registeredUser) => {
    if (err) {
      console.log(err);
    } else {
      res.status(200).send(registeredUser);
    }
  });
});

router.post("/login", (req, res) => {
  let userData = req.body;
  res.status(200).send(userData);
});

router.get("/feed", (req, res) => {
  res.send("feed");
});

module.exports = router;
