//Modules
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

//Include routes
const users = require("./routes/api/users");
const profiles = require("./routes/api/profile");
const posts = require("./routes/api/posts");

const app = express();

//Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Mongo Config
const db = require("./config/keys").mongoURI;
mongoose
  .connect(db)
  .then(() => console.log("Mongo is connected"))
  .catch(err => console.log(err));

//Passport Middleware
app.use(passport.initialize());

//Passport Config
require("./config/passport")(passport);

const port = process.env.port || 5000;

//Use routes
app.use("/api/users", users);
app.use("/api/profile", profiles);
app.use("/api/posts", posts);

//Loads the home route
app.get("/", (req, res) => {});

app.listen(port, () => {
  console.log("Home-Portal is listening on port " + port);
});
