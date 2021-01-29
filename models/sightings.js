// Creating and exporting the Sightings model
module.exports = function (sequelize, DataTypes) {
  const Sightings = sequelize.define("Sightings", {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    user_name: DataTypes.STRING,
    email: DataTypes.STRING,
    score: DataTypes.INTEGER,
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
