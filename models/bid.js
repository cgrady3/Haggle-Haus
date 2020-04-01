/* eslint-disable camelcase */
module.exports = function(sequelize, DataTypes) {
  var bid = sequelize.define("bid", {
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
        len: [20, 140]
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

  bid.associate = function(models) {
    bid.belongsTo(models.users, {
      foreignKey: {
        allowNull: false
      }
    });

    bid.belongsTo(models.item, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return bid;
};
