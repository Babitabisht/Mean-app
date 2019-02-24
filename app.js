const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const passport = require("passport");
const users = require("./routes/users");
const config = require("./config/db");
mongoose.connect(config.database);

mongoose.connection.on("connected", () => {
  console.log("Connected to database .....!" + config.database);
});
mongoose.connection.on("error", err => {
  console.log(" database error.....!" + err);
});

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.use(cors());

app.use(passport.initialize());
app.use(passport.session());

require("./config/passport")(passport);
const PORT = 3000;

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.send("invalid endpoints.......");
});

app.use("/users", users);

app.listen(PORT, () => {
  console.log(`app listening to port ${PORT}`);
});
