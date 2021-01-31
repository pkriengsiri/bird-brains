// Dependencies
const express = require("express");
const db = require("../models");

// Creates a new router object
const router = express.Router();

// view all sightings
router.get("/sightings", (req, res) => {
  db.Sighting.findAll()
    .then((allSightings) => {
      res.render("all-sightings", { sightings: allSightings });
    })
    .catch((err) => {
      console.log(err);
      //TODO: render 404 page if we're unable to return trains
      res.status(500).end();
    });
});

// view single sighting
router.get("/sightings/:id", (req, res) => {
  db.Sighting.findOne({ where: { id: req.params.id } })
    .then((singleSighting) => {
      res.render("single-sighting", singleSighting.dataValues);
    })
    .catch((err) => {
      console.log(err);
      //TODO: render 404 page if we're unable to return trains
      res.status(500).end();
    });
});

// view edit form
router.get("/sightings/:id/edit", (req, res) => {
  db.Sighting.findOne({ where: { id: req.params.id } })
    .then((singleSighting) => {
      res.render("edit-sighting", singleSighting.dataValues);
    })
    .catch((err) => {
      console.log(err);
      //TODO: render 404 page if we're unable to return trains
      res.status(500).end();
    });
});

// add to db
router.post("/api/sightings", (req, res) => {
  db.Sighting.create(req.body)
    .then((createdSighting) => {
      res.json(createdSighting);
    })
    .catch((err) => {
      console.log(err);
      //TODO: render 404 page if we're unable to return trains
      res.status(500).end();
    });
});

// edit db
router.post("/api/sightings/:id", (req, res) => {
  db.Sighting.update(req.body, { where: { id: req.params.id } })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
      //TODO: render 404 page if we're unable to return trains
      res.status(500).end();
    });
});

// delete from db
router.delete("/api/sightings/:id", (req, res) => {
  db.Sighting.destroy({ where: { id: req.params.id } })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
      //TODO: render 404 page if we're unable to return trains
      res.status(500).end();
    });
});

// view add form
router.get("/sighting/new", (req, res) => {
  db.User.findAll({order: [['user_name', 'ASC']]}).then((allUsers) => {
    db.Bird.findAll({order: [['common_name', 'ASC']]}).then((allBirds) => {
      res.render("new-sighting", { users: allUsers, birds: allBirds });
    });
  });
  //res.render("new-sighting");
});

module.exports = router;
