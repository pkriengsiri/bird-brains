// Dependencies
const express = require("express");
const db = require("../models");

// Creates a new router object
const router = express.Router();



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
      console.log(user);
      res.json(user);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).end();
    });
});

module.exports = router;
