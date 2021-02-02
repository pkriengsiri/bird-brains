// Dependencies
const express = require("express");
const db = require("../models");
const moment = require("moment");

// Creates a new router object
const router = express.Router();

// view home page recent sightings
router.get("/", (req, res) => {
  db.Sighting.findAll({
    order: [["id", "DESC"]],
    include: ["User", "Bird"],
  })
    .then((allSightings) => {
      res.render("index", {
        sightings: allSightings,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).end();
    });
});

// view all sightings in order of most recent

router.get("/sightings", (req, res) => {
  db.Sighting.findAll({
    order: [["createdAt", "DESC"]],
    include: ["Bird"],
  })
    .then((allSightings) => {
      const formattedSightings = allSightings.map((sighting) => {
        const formattedSighting = { ...sighting.dataValues };
        formattedSighting.createdAt = moment(sighting.createdAt)
          ? moment(sighting.createdAt).format("MMM D, YYYY")
          : "N/A";
        return formattedSighting;
      });

      res.render("all-sightings", {
        sightings: formattedSightings,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).end();
    });
});

// view single sighting
router.get("/sightings/:id", (req, res) => {
  db.Sighting.findOne({
    where: { id: req.params.id },
    include: ["User", "Bird"],
  })
    .then((singleSighting) => {
      const formattedSighting = singleSighting.dataValues;
      formattedSighting.createdAt = moment(formattedSighting.createdAt).format(
        "MMM D, YYYY"
      );

      res.render("single-sighting", formattedSighting);
    })
    .catch((err) => {
      console.log(err);
      //TODO: render 404 page if we're unable to return sightings
      res.status(500).end();
    });
});

// view edit form
router.get("/sightings/:id/edit", (req, res) => {
  db.User.findAll({ order: [["user_name", "ASC"]] }).then((allUsers) => {
    db.Bird.findAll({ order: [["common_name", "ASC"]] }).then((allBirds) => {
      db.Sighting.findOne({
        where: { id: req.params.id },
        include: ["User", "Bird"],
      })
        .then((singleSighting) => {
          res.render("edit-sighting", {
            users: allUsers,
            birds: allBirds,
            sighting: singleSighting,
          });
        })
        .catch((err) => {
          console.log(err);
          //TODO: render 404 page if we're unable to return sightings
          res.status(500).end();
        });
    });
  });
});

// add to db
router.post("/api/sightings", (req, res) => {
  db.Sighting.create(req.body)
    .then((createdSighting) => {
      res.json(createdSighting);
      // res.redirect(307,`/users/${parseInt(createdSighting.UserId)}`)
    })
    .catch((err) => {
      console.log(err);
      //TODO: render 404 page if we're unable to return sightings
      res.status(500).end();
    });
});

// edit db
router.put("/api/sightings/:id", (req, res) => {
  db.Sighting.update(req.body, { where: { id: req.params.id } })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
      //TODO: render 404 page if we're unable to return sightings
      res.status(500).end();
    });
});

// delete from db
router.delete("/api/sightings/:id", (req, res) => {
  let newScore;
  // first get the sighting with the user's score an bird points
  db.Sighting.findOne({
    where: { id: req.params.id },
    include: ["User", "Bird"],
  })
    .then((singleSighting) => {
      const userScore = singleSighting.dataValues.User.score;
      const userId = singleSighting.dataValues.User.id;
      const birdPoints = singleSighting.dataValues.Bird.points;
      newScore = userScore - birdPoints;
      console.log(newScore);
      console.log(userId);
      // update user score
      db.User.update(
        { score: newScore },
        {
          where: {
            id: userId,
          },
        }
      )
        .then((user) => {
          // delete sighting
          db.Sighting.destroy({ where: { id: req.params.id } })
            .then((result) => {
              res.json(result);
            })
            .catch((err) => {
              console.log(err);
              //TODO: render 404 page if we're unable to return sightings
              res.status(500).end();
            });
        })
        .catch((err) => {
          console.log(err);
          res.status(500).end();
        });
    })
    .catch((err) => {
      console.log(err);
      //TODO: render 404 page if we're unable to return sightings
      res.status(500).end();
    });
});

// view add form
router.get("/sighting/new", (req, res) => {
  let query = {};
  let specificUser = false;
  if (req.query.user_id) {
    query.id = req.query.user_id;
    specificUser = true;
  }
  db.User.findAll({ where: query, order: [["user_name", "ASC"]] })
    .then((allUsers) => {
      db.Bird.findAll({ order: [["common_name", "ASC"]] }).then((allBirds) => {
        // res.json({ users: allUsers, birds: allBirds,query:query })

        res.render("new-sighting", {
          users: allUsers,
          birds: allBirds,
          query: specificUser,
        });
      });
    })
    .catch((err) => {
      console.log(err);
      //TODO: render 404 page if we're unable to return sightings
      res.status(500).end();
    });
  //res.render("new-sighting");

  // api single sighting
  router.get("/api/sightings/:id", (req, res) => {
    db.Sighting.findOne({
      where: { id: req.params.id },
      include: ["User", "Bird"],
    })
      .then((singleSighting) => {
        res.json(singleSighting.dataValues);
      })
      .catch((err) => {
        console.log(err);
        //TODO: render 404 page if we're unable to return sightings
        res.status(500).end();
      });
  });
});

module.exports = router;
