const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

// Bring in User Model
let User = require("../models/user.js");
const passport = require("passport");

//Users CRUD routes
router
  .route("/")
  .get(ensureAthenticated, async (req, res) => {
    //List Users
    if (!req.user.roles.includes("admin")) {
      req.flash("danger", "Not Authorized to view users list");
      res.redirect("/");
      return res.status(401).send();
    }

    try {
      let users = await User.find({});

      res.render("users", {
        title: "Users",
        users,
      });
    } catch (error) {
      console.log(error);
    }
  })
  /* Register Process */
  .post(
    [
      body("name", "Name is required").notEmpty(),
      body("email", "a Valid e-mail is required").normalizeEmail().isEmail(),
      body("username", "Username is required").notEmpty(),
      body("password", "Password must be at least 3 characters and maximum 12.")
        .exists({ checkFalsy: true })
        .bail()
        .isLength({ min: 3, max: 12 }),
      body("passwordConfirmation", "Passwords do not match")
        .exists()
        .custom((value, { req }) => value === req.body.password),
      body("roles", "You must choose one role at least").notEmpty(),
    ],
    async (req, res) => {
      // Finds the validation errors in this request and wraps them in an object with handy functions
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.render("users/register", {
          title: "Register",
          newUser: req.body,
          errors: errors.array(),
        });
      } else {
        let { username, email, name, password, roles } = req.body;
        roles = Array.isArray(roles) ? roles : [roles];
        let newUser = new User({
          name,
          username,
          email,
          password,
          roles,
        });

        bcrypt.genSalt(10, async (err, salt) => {
          try {
            let hash = await bcrypt.hash(newUser.password, salt);
            newUser.password = hash;

            await newUser.save();

            req.flash("success", "You are now registered and can log in.");
            res.redirect("/");
          } catch (error) {
            console.log(error);
            res.status(500).send("Não foi possível processar esta requisição");
          }
        });
      }
    }
  );

router
  .route("/login")
  .get((req, res) => {
    //Login Form
    res.render("users/login");
  })
  .post(
    /** Login Process */
    passport.authenticate("local", {
      successRedirect: "/articles",
      failureRedirect: "/users/login",
      failureFlash: true,
    })
  );

// Logout
router.get("/logout", (req, res) => {
  req.logout();
  req.flash("success", "You are now logged out.");
  return res.redirect("/users/login");
});

//Register Form
router.get("/register", (req, res) => {
  res.render("users/register", {
    title: "Register",
  });
});

//Load Edit form
router.get("/edit/:id", ensureAthenticated, async (req, res) => {
  //Load Edit Form
  const { id } = req.params;

  if (!(req.user.id === id || req.user.roles.includes("admin"))) {
    req.flash("danger", "Not Authorized");
    return res.redirect("/");
  }

  try {
    let user = await User.findById(id);

    res.render("users/edit_user", {
      title: "Edit User",
      userDb: user,
    });
  } catch (error) {
    console.log(error);
    return;
  }
});

router
  .route("/:id")
  .get(ensureAthenticated, async (req, res) => {
    //View user info
    const { id } = req.params;

    if (!(req.user.id === id || req.user.roles.includes("admin"))) {
      req.flash("danger", "Not Authorized");
      return res.redirect("/");
    }

    try {
      let user = await User.findById(id);
      res.render("users/user", {
        userDb: user,
        // userAuthenticated: req.user,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send("User Not Found!");
    }
  })
  .post(
    ensureAthenticated,
    [
      body("name", "Name is required").notEmpty(),
      body("email", "a Valid e-mail is required").normalizeEmail().isEmail(),
      body("username", "Username is required").notEmpty(),
      body("password", "Password must be at least 3 characters and maximum 12.")
        .optional({ checkFalsy: true })
        .exists({ checkFalsy: true })
        .bail()
        .isLength({ min: 3, max: 12 }),
      body("passwordConfirmation", "Passwords do not match")
        .exists()
        .custom((value, { req }) => value === req.body.password),
      body("roles", "You must choose one role at least").optional().isArray(),
    ],
    async (req, res) => {
      // Edit User info
      const { id } = req.params;

      if (!(req.user.id === id || req.user.roles.includes("admin"))) {
        return res.status(401).send();
      }

      // Finds the validation errors in this request and wraps them in an object with handy functions
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        //Render Edit User View with sent data and errors
        res.render("users/edit_user", {
          title: "Edit User",
          userDb: Object.assign({}, req.body, { _id: id }),
          user: req.user,
          errors: errors.array(),
        });
      } else {
        const { name, username, email, password, roles } = req.body;
        let query = { _id: id };
        let user = {};

        user.name = name;
        user.username = username;
        user.email = email;

        if (password) {
          const salt = bcrypt.genSaltSync(10);
          const hash = bcrypt.hashSync(password, salt);
          user.password = hash;
        }

        if (req.user.roles.includes("admin")) {
          user.roles = roles.filter((v) => v !== "");
        }

        try {
          await User.updateOne(query, user);

          req.flash("success", "User updated sucessfully");
          req.user.roles.includes("admin")
            ? res.redirect("/users")
            : res.redirect("/");
        } catch (error) {
          console.log(error);
          return;
        }
      }
    }
  )
  .delete(async (req, res) => {
    const query = {};
    query._id = req.params.id;

    try {
      await User.deleteOne(query);
      res.send("deleted successfully");
    } catch (error) {
      console.log(error);
    }
  });

function ensureAthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    req.flash("danger", "Please login.");
    res.redirect("/users/login");
  }
}

module.exports = router;
