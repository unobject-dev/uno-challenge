const { Op } = require('sequelize');
const Todo = require('./todo.model');

const findAll = async (filter = {}) => {
  const where = {};
  if (filter.id) {
    where.id = filter.id;
  }

  if (filter.name) {
    where.name = { [Op.iLike]: `%${filter.name}%` };
  }

  const items = await Todo.findAll({ where });

  return items;
};

const findByName = async (name) => {
  const item = await Todo.findOne({ where: { name } });

  return item;
};

const insert = async (name) => {
  const created = await Todo.create({ name });

  return created;
};

const updateNameById = async (id, name) => {
  const [rows] = await Todo.update({ name }, { where: { id } });
  const success = rows === 1;

  return success;
};

const deleteById = async (id) => {
  const rows = await Todo.destroy({ where: { id } });
  const success = rows === 1;

  return success;
};

module.exports = {
  findAll,
  findByName,
  insert,
  updateNameById,
  deleteById,
};
