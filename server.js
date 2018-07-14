// eslint-disable-line 
require("dotenv").load();// load environment config

// eslint-disable-next-line
const PORT = process.env.PORT || 8080; // set port 
const express = require("express");
const path = require("path");
const logger = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const passport = require("passport");
// require controllers
const skin = require("./controllers/skin");

const app = express();
// middleware used in all routes
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application.json" }));
app.use(cookieParser());
app.use(logger("tiny"));

// static files directories
app.use(express.static(`${__dirname}/client/public`));
app.use(passport.initialize());

// passport strategies
const localSignupStrategy = require("./passport/local-signup");
const localLoginStrategy = require("./passport/local-login");
passport.use('local-signup', localSignupStrategy);
passport.use('local-login', localLoginStrategy);

// auth check middleware
const authCheckMiddleware = require('./middleware/auth-check');
app.use('', authCheckMiddleware);
// ROUTES
app.get("/", () => {
});
// skins
app.use("/skin",skin);
// static files route


app.listen(PORT, () => {
  // eslint-disable-next-line
  console.log(`app listening on port ${PORT}!\n`);
});
