const { DataTypes } = require('sequelize');
const sequelize = require('../../db');
const Lane = require('../lane/lane.model');

const Todo = sequelize.define('Todo', {
  id:        { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name:      { type: DataTypes.STRING,  allowNull: false, unique: true },
  lane_id:   { type: DataTypes.INTEGER, references: { model: 'lanes', key: 'id' } },
  created_at:{ type: DataTypes.DATE },
  updated_at:{ type: DataTypes.DATE },
  deleted_at:{ type: DataTypes.DATE },
}, { tableName: 'todos', timestamps: false, paranoid: false });

Todo.belongsTo(Lane, { foreignKey: 'lane_id' });
Lane.hasMany(Todo, { foreignKey: 'lane_id' });

module.exports = Todo;
