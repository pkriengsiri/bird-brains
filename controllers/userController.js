// Dependencies
const express = require("express");
const db = require("../models");

// Creates a new router object
const router = express.Router();

// View route for creating a new user
router.get("/users/new", (req, res) => {
  res.render("new-user");
});

// API POST route to create a user
router.post("/api/users", (req, res) => {
  db.User.create(req.body)
    .then((createdUser) => {
      res.json(createdUser);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).end();
    });
});

// API route to edit a single user
router.put("/api/users/:id", (req, res) => {
  db.User.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).end();
    });
});

/**
 * Route to render high scores page.
 */
router.get("/highscores", (req, res) => {
  db.User.findAll({ order: [["score", "DESC"]] })
    .then((highscores) => {
      res.render("highscores", { users: highscores });
    })
    .catch((err) => {
      console.log(err);
      //TODO: render 404 page if we're unable to return birds
      res.status(500).end();
    });
});

module.exports = router;
