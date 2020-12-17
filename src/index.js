const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");

//load env variables
dotenv.config();

//load database config
const dbConfig = require("./config/database.js");

//connect to database
mongoose.connect(dbConfig.database, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
let db = mongoose.connection;

//check connection
db.once("open", () => {
  console.log("Connected to MongoDB");
});

//check for DB errors
db.on("error", function (err) {
  console.log(err);
});

//init app
const app = express();

//set app port
app.set("port", process.env.SERVER_PORT || 8000);

//BodyParser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//set public folder
app.use(express.static(__dirname + "/public"));

//set a session (Express Session Middleware)
app.use(
  session({
    secret: dbConfig.secret,
    resave: true,
    saveUninitialized: true,
  })
);

//Express Messages Middleware
app.use(flash());
app.use(function (req, res, next) {
  res.locals.messages = require("express-messages")(req, res);
  next();
});

// Passport Config
require("./config/passport.js")(passport);
// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

// load View Engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.get("*", (req, res, next) => {
  res.locals.user = req.user || null;
  next();
});

// Home route
app.get("/", (req, res, next) => {
  res.render("index", {
    title: "Hello world",
  });
});

//Route files
let articles = require("./routes/articles.js");
let users = require("./routes/users.js");
app.use("/articles", articles);
app.use("/users", users);

// start server
app.listen(app.get("port"), () => {
  console.log(`Server started on http://localhost:${app.get("port")}`);
});
