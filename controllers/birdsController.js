const express = require("express");
const db = require("../models");

const router = express.Router();

/**
 * Route to render all birds to a page.
 */
router.get("/birds", (req, res) => {
  db.Bird.findAll()
    .then((allBirds) => {
      console.log(allBirds);
      res.render("all-Birds", { birds: allBirds });
    })
    .catch((err) => {
      console.log(err);
      //TODO: render 404 page if we're unable to return birds
      res.status(500).end();
    });
});

/**
 * Display information about a single bird.
 */
router.get("/birds/:id", (req, res) => {
  db.Bird.findOne({
    where: { id: req.params.id },
  })
    .then((singleBird) => {
      res.render("single-Bird", singleBird.dataValues);
    })
    .catch((err) => {
      console.log(err);
      //TODO: render 404 page if we're unable to return birds
      res.status(500).end();
    });
});

/**
 * Other RESTful routes not being used for the birds model MVP
 */
// router.get("birds/new"         to show the form for adding new birds
// router.get("birds/:id/edit"    to show the form for editing a single bird
// router.post("api/birds"        to add a new bird to the db from the submitted form
// router.put("api/birds/:id"     to updated a single bird from the submitted form
// router.delete("api/birds/:id"  to delete a single bird from the db

module.exports = router;
