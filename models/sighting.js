// Creating and exporting the Sightings model
module.exports = function (sequelize, DataTypes) {
  const Sighting = sequelize.define("Sighting", {
    location: DataTypes.STRING,
    comments: DataTypes.TEXT,
    // user_id: DataTypes.INTEGER,
    // bird_id: DataTypes.INTEGER,
  });

  // Associating Sightings with the User and Bird models
  Sighting.associate = function (models) {
    // A sighting can't be created without an User due to the foreign key constraint
    Sighting.belongsTo(models.User, {
      foreignKey: {
        allowNull: false,
      },
    });
    // A sighting can't be created without an bird due to the foreign key constraint
    Sighting.belongsTo(models.Bird, {
      foreignKey: {
        allowNull: false,
      },
    });
  };

  return Sighting;
};
