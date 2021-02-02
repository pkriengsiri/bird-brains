// Creating and exporting the User model
module.exports = function (sequelize, DataTypes) {
  const User = sequelize.define("User", {
    first_name: { type: DataTypes.STRING, allowNull: false, len: [1, 50] },
    last_name: { type: DataTypes.STRING, allowNull: false, len: [1, 50] },
    user_name: { type: DataTypes.STRING, allowNull: false, len: [1, 50] },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      len: [1, 100],
      isEmail: true,
    },
    score: { type: DataTypes.INTEGER, defaultValue: 0 },
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
