const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Respond from users ROUTE");
});

router.post("/register", (req, res) => {
  let userData = req.body;
  res.status(200).send(userData);
});

router.post("/login", (req, res) => {
  let userData = req.body;
  res.status(200).send(userData);
});

module.exports = router;
