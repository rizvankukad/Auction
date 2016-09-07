'use strict';

export default function(sequelize, DataTypes) {
  return sequelize.define('Inventory', {
    _id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: DataTypes.STRING,
    item: DataTypes.STRING,
    quantity: DataTypes.INTEGER
  });
}
