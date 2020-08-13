const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const PORT = process.env.PORT || 3000;
const users = require("./routes/users");
const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use("/", users);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
