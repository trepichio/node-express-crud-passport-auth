const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const passport = require('passport');

//Article model
const Article = require("../models/articles");
//User model
const User = require("../models/user");

//Articles CRUD routes
router
  .route("/")
  .get(async (req, res) => {
    //List Articles route

    try {
      let articles = await Article.find({});

      res.render("articles", {
        title: "Articles",
        articles,
      });
    } catch (error) {
      console.log(error);
    }
  })
  /* Add Submit POST route */
  .post(
    [
      body("title", "Title is required").notEmpty(),
      body("body", "Body is required").notEmpty(),
    ],
    async (req, res) => {
      // Finds the validation errors in this request and wraps them in an object with handy functions
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.render("articles/add_article", {
          title: "Add Article",
          article: req.body,
          errors: errors.array(),
        });
      } else {
        const { title, body, role } = req.body;

        let article = new Article();
        article.title = title;
        article.author = req.user._id;
        article.body = body;
        article.role = role;

        try {
          await article.save();
          req.flash("success", "Article added");
          res.redirect("/articles");
        } catch (error) {
          console.log(error);
          res.status(500).send("Não foi possível processar esta requisição");
        }
      }
    }
  );

//Add article route
router.get("/add", ensureAthenticated, (req, res) => {
  res.render("articles/add_article", {
    title: "Add article",
  });
});

//Load Edit form
router.get("/edit/:id", ensureAthenticated, async (req, res) => {
  const { id } = req.params;

  try {
    let article = await Article.findById(id);
    if (article.author !== req.user.id) {
      req.flash('danger', 'Not Authorized')
      res.redirect('/')
      return;
    }

    res.render("articles/edit_article", {
      title: "Edit Article",
      article,
    });
  } catch (error) {
    console.log(error);
    return;
  }
});

router
  .route("/:id")
  .get(async (req, res) => {
    const { id } = req.params;

    try {
      let article = await Article.findById(id);
      let user = await User.findById(article.author);

      res.render("articles/article", {
        article,
        author: user.name
      });
    } catch (error) {
      console.log(error);
      res.status(500).send("Article Not Found!");
    }
  })
  .post(async (req, res) => {
    const { id } = req.params;
    const { title, body, author } = req.body;
    let query = { _id: id };
    let article = {};

    article.title = title;
    article.author = author;
    article.body = body;

    try {
      await Article.updateOne(query, article);

      req.flash("success", "Article updated sucessfully");
      res.redirect(`/articles`);
    } catch (error) {
      console.log(error);
      return;
    }
  })
  .delete(async (req, res) => {
    if (!req.user?._id) {
      return res.status(500).send();
    }

    const query = {};
    query._id = req.params.id;

    try {
      let article = await Article.findById(req.params.id);

      if (article.author !== req.user.id) {
        return res.status(500).send();
      }

      await Article.deleteOne(query);

      res.send("deleted successfully");
    } catch (error) {
      console.log(error);
    }
  });

function ensureAthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    next()
  }
  else {
    req.flash('danger', 'Please login.')
    res.redirect('/users/login')
  }
}


module.exports = router;
