const express = require("express");
const db = require("../models");

const router = express.Router();


/**
 * Route to render all birds to a page. 
 */
router.get("/birds", (req, res) => {
  db.Train.findAll()
    .then((allBirds) => {
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
  db.Train.findOne({
    where: { id: req.params.id },
  })
    .then((singleBird) => {
       res.render("single-Bird", singleBird.dataValues);
    })
    .catch((err) => {
      res.status(500).end();
    });
});




module.exports = router;
