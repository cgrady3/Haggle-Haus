var bcrypt = require("bcryptjs");

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
        len: [8]
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

  users.prototype.verifyPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
  };

  users.addHook("beforeCreate", function(user) {
    user.password = bcrypt.hashSync(
      user.password, 10
    );
  });

  return users;
};
