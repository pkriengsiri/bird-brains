// Dependencies
const express = require("express");
const db = require("../models");

// Creates a new router object
const router = express.router();

// API route to edit a single user
router.put("/users/:id", (req, res) => {
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
