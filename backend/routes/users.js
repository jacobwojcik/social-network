const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
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

router.post("/register", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const userData = {
      login: req.body.login,
      password: hashedPassword,
      email: req.body.email,
    };
    let user = new User(userData);
    const registeredUser = await user.save();
    res.status(200).send(registeredUser);
  } catch (err) {
    console.log(err);
  }
});

router.post("/login", async (req, res) => {
  const userData = req.body;
  try {
    const user = await User.findOne({ login: userData.login }, (err, user) => {
      if (err) {
        console.log(err);
      } else {
        if (!user) {
          res.status(401).send("Invalid login");
        } else if (bcrypt.compare(userData.password, user.password)) {
          let payload = { subject: user._id };
          let token = jwt.sign(payload, "secretKey");
          res.status(200).send({ token });
        } else {
          res.status(401).send("Invalid  password");
        }
      }
    });
  } catch (err) {
    console.log(err);
  }
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
