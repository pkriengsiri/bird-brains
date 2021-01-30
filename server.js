// DEPENDENCIES
const express = require("express");
const exphbs = require("express-handlebars");
const handlebars = require("handlebars");
const {
  allowInsecurePrototypeAccess,
} = require("@handlebars/allow-prototype-access");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// require all models
const db = require("./models");

// require controllers
const UserController = require("./controllers/userController");
// const TrainsController = require("./controllers/trainsController");
const BirdsController = require("./controllers/birdsController");
const SightingsController = require("./controllers/sightingsController");

// define the port to be listened to
const PORT = process.env.PORT || 8080;

// middle ware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static directory
app.use(express.static("public"));

app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main",
    handlebars: allowInsecurePrototypeAccess(handlebars),
  })
);
app.set("view engine", "handlebars");

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/api/config", (req, res) => {
  res.json({
    success: true,
  });
});

// use routes on controllers
app.use(UserController);
// app.use(TrainsController);
app.use(BirdsController);
app.use(SightingsController);

// connect to sql db and have server listen to port
db.sequelize
  // .sync({ force: true })
  .sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
