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
 * shows top 20
 */
router.get("/highscores", (req, res) => {
  db.User.findAll({ order: [["score", "DESC"]], limit: 20 })
    .then((highscores) => {
      // res.json({ users: highscores, rank: rank});
      res.render("highscores", { users: highscores });
    })
    .catch((err) => {
      console.log(err);
      //TODO: render 404 page if we're unable to return birds
      res.status(500).end();
    });
});

// view single user and their sightings
router.get("/users/:id", (req, res) => {
  db.User.findOne({ where: { id: req.params.id } })
    .then((singleUser) => {
      db.Sighting.findAll({
        where: { UserId: singleUser.id },
        order: [["createdAt", "DESC"]],
        include: [db.Bird],
      }).then((userSightings) => {
        // res.json({
        res.render("user-sightings", {
          user: singleUser.dataValues,
          sightings: userSightings,
        });
      });
    })
    .catch((err) => {
      console.log(err);
      //TODO: render 404 page if we're unable to return trains
      res.status(500).end();
    });
});

module.exports = router;
