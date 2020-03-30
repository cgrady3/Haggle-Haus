/* eslint-disable camelcase */
module.exports = function(sequelize, DataTypes) {
  var users = sequelize.define("users", {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [8, 15]
      }
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [8, 15]
      }
    }
  });

  users.associate = function(models) {
    users.hasMany(models.item, {
      onDelete: "cascade"
    });
    users.hasMany(models.bid, {
      onDelete: "cascade"
    });
  };

  return users;
};
