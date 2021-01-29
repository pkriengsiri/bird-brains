// Creating and exporting the User model
module.exports = function (sequelize, DataTypes) {
  const User = sequelize.define("User", {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    user_name: DataTypes.STRING,
    email: DataTypes.STRING,
    score: DataTypes.INTEGER,
  });

  // Associating User with Sightings
  User.associate = function (models) {
    // When an User is deleted, also delete any associated Sightings
    User.hasMany(models.Sighting, {
      onDelete: "cascade",
    });
  };

  return User;
};
