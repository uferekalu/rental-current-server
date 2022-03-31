require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const passport = require("passport");
const users = require("./routes/api/users");
const rents = require("./routes/api/rentals");
const PORT = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const db = mongoose.connection;
db.on("error", error => console.error(error));
db.once("open", () => console.log("Database connected"));

// Passport middleware
app.use(passport.initialize());
// Passport config
require("./config/passport")(passport);

app.get("/", (req, res) => {
  res.json({ msg: "Welcome to Kwaba application" });
});
app.use("/api", users);
app.use("/api", rents);

app.listen(PORT, () => {
  console.log("Server running on port", `${PORT}`);
});
