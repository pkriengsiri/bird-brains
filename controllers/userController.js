// Dependencies
const express = require("express");
const db = require("../models");
const moment = require("moment");

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
  db.User.findAll({ order: [["score", "DESC"]] })
    // db.User.findAll({ order: [["score", "DESC"]], limit: 20 })
    .then((highscores) => {
      let rankedScores = highscores;
      for (let i = 0; i < highscores.length; i++) {
        let rank = i+1;
        rankedScores[i]["rank"] = rank;
        if (rank <4){
          rankedScores[i]["trophy"] = rank;
        } else {
          rankedScores[i]["trophy"] = 0;
        }
        
      }
      res.render("highscores", { users: rankedScores });
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
        const formattedSightings = userSightings.map((sighting) => {
          const formattedSighting = { ...sighting.dataValues };
          formattedSighting.createdAt = moment(sighting.createdAt)
            ? moment(sighting.createdAt).format("MMM D, YYYY")
            : "N/A";
          return formattedSighting;
        });
        // res.json({
        res.render("user-sightings", {
          user: singleUser.dataValues,
          sightings: formattedSightings,
        });
      });
    })
    .catch((err) => {
      console.log(err);
      //TODO: render 404 page if we're unable to return user
      res.status(500).end();
    });
});

module.exports = router;
