/* eslint-disable camelcase */
module.exports = function(sequelize, DataTypes) {
    var Buyers = sequelize.define("Sellers", {
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
      buy_barter: DataTypes.STRING,
      picture: {
        type: DataTypes.STRING,
        defaultVAlue: https://cdn.clipart.email/4c2ef11c7e671bae0244a859318e1146_trading-clipart-4-clipart-station_1300-1390.jpeg
      }
    });
    
  
            Buyers.associate = function (models) {
          Buyers.belongTo(models.User, {
              foreignKey: {
                allowNull: false
            }
        })
  }
  
      return Buyers;
  
  };