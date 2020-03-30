/* eslint-disable camelcase */
module.exports = function(sequelize, DataTypes) {
  var item = sequelize.define("item", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    base_barter: {
      type: DataTypes.STRING
    },
    base_barter_amount: {
      type: DataTypes.INTEGER
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 20
      }
    },
    sold: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    picture: {
      type: DataTypes.STRING,
      defaultValue:
        "https://cdn.clipart.email/4c2ef11c7e671bae0244a859318e1146_trading-clipart-4-clipart-station_1300-1390.jpeg"
    }
  });

  item.associate = function(models) {
    item.belongsTo(models.users, {
      foreignKey: {
        allowNull: false
      }
    });
    item.hasMany(models.bid, {
      onDelete: "cascade"
    });
  };

  return item;
};
