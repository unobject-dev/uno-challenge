const { DataTypes } = require('sequelize');
const sequelize = require('../../db');

const Lane = sequelize.define('Lane', {
  id:        { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name:      { type: DataTypes.STRING,  allowNull: false },
  position:  { type: DataTypes.INTEGER, allowNull: false },
  is_done:   { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
  created_at:{ type: DataTypes.DATE },
  updated_at:{ type: DataTypes.DATE },
}, { tableName: 'lanes', timestamps: false });

module.exports = Lane;
