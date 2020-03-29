/* eslint-disable camelcase */
module.exports = function(sequelize, DataTypes) {
  var Bid = sequelize.define("Bid", {
    bid: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 20
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    accepted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    picture: {
      type: DataTypes.STRING,
      defaultValue:
        "https://cdn.clipart.email/4c2ef11c7e671bae0244a859318e1146_trading-clipart-4-clipart-station_1300-1390.jpeg"
    }
  });

  Bid.associate = function(models) {
    Bid.belongsTo(models.Users, {
      foreignKey: {
        allowNull: false
      }
    });

    Bid.belongsTo(models.Item, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Bid;
};
