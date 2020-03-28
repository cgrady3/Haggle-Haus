/* eslint-disable camelcase */
module.exports = function(sequelize, DataTypes) {
  var Users = sequelize.define("Users", {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [1, 15]
      }
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [1, 15]
      }
    }
  });

  Users.associate = function(models) {
    Users.hasMany(models.Item, {
      onDelete: "cascade"
    });
  };

  return Users;
};
