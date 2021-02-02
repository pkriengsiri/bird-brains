const express = require("express");
const db = require("../models");

const router = express.Router();

/**
 * Route to render all birds to a page.
 */
router.get("/birds", (req, res) => {
  // object to hold pagination values
  const pagination = {};

  // get query parameters
  const limit = parseInt(req.query.results);
  const offset = (parseInt(req.query.page) - 1) * limit;

  // set pagination values or use defaults if not provided
  if (req.query.page) {
    pagination.limit = limit;
    pagination.offset = offset;
  } else {
    pagination.limit = 10;
    pagination.offset = 0;
  }

  // query to get number of all results
  db.Bird.findAll().then((response) => {
    const numberOfResults = { number: response.length };

    //query to get paginated results
    db.Bird.findAll(pagination)
      .then((allBirds) => {
        res.render("all-birds", { birds: allBirds, results: numberOfResults });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).end();
      });
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
      res.render("single-bird", singleBird.dataValues);
    })
    .catch((err) => {
      console.log(err);
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
