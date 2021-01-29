// Creating and exporting the Sightings model
module.exports = function (sequelize, DataTypes) {
  const Sightings = sequelize.define("Sightings", {
    location: DataTypes.STRING,
    comments: DataTypes.TEXT,
    user_id: DataTypes.INTEGER,
    bird_id: DataTypes.INTEGER,
  });

  // Associating Sightings with the User and Bird models
  Sightings.associate = function (models) {
    // A sighting can't be created without an User due to the foreign key constraint
    Sightings.belongsTo(models.User, {
      foreignKey: {
        allowNull: false,
      },
    });
    // A sighting can't be created without an bird due to the foreign key constraint
    Sightings.belongsTo(models.Bird, {
      foreignKey: {
        allowNull: false,
      },
    });
  };

  return Sightings;
};
