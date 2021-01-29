// Creating and exporting the Bird model
module.exports = function (sequelize, DataTypes) {
  const Bird = sequelize.define("Bird", {
    common_name: DataTypes.STRING,
    image_URL: DataTypes.STRING,
    points: DataTypes.INTEGER
  });

  // Associating Bird with Sightings
  Bird.associate = function (models) {
    // When an Bird is deleted, also delete any associated Sightings
    Bird.hasMany(models.Sighting, {
      onDelete: "cascade",
    });
  };

  return Bird;
};
