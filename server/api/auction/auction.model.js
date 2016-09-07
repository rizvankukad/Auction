'use strict';

export default function(sequelize, DataTypes) {
  return sequelize.define('Auction', {
    _id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    seller : DataTypes.STRING,
    item: DataTypes.STRING,
    qty: DataTypes.INTEGER,
    minbid: DataTypes.INTEGER,
    winbid: DataTypes.INTEGER,
    active: DataTypes.BOOLEAN,
    starttime: DataTypes.NOW,
    pending: DataTypes.BOOLEAN,
    winner: DataTypes.STRING
  });
}
