const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = require("../models/user");
const Post = require("../models/post");

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

//MIDDLEWARE
const verifyToken = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).send("Unauthorized request");
  }
  let token = req.headers.authorization.split(" ")[1];
  if (token === "null") {
    return res.status(401).send("Unauthorized request");
  }
  let payload = jwt.verify(token, "secretKey");
  if (!payload) {
    return res.status(401).send("Unauthorized request");
  }
  req.userId = payload.subject;
  next();
};

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
  User.findOne({ login: userData.login }, (err, user) => {
    if (err) {
      console.log(err);
    } else {
      if (!user) {
        res.status(401).send("Invalid login");
      } else {
        if (user.password !== userData.password) {
          res.status(401).send("Invalid  password");
        } else {
          let payload = { subject: user._id };
          let token = jwt.sign(payload, "secretKey");
          res.status(200).send({ token });
        }
      }
    }
  });
});

router.post("/post", (req, res) => {
  let postData = req.body;
  let post = new Post(postData);
  post.save((err, newPost) => {
    if (err) {
      console.log(err);
    } else {
      res.status(200).send(newPost);
    }
  });
});
router.get("/posts", verifyToken, async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
