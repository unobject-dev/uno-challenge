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

const update = async (id, values) => {
  const [rows] = await Todo.update(values, { where: { id } });
  const success = rows === 1;

  return success;
};

const updateLaneId = async (id, laneId) => {
  await Todo.update({ lane_id: laneId }, { where: { id } });
}

const deleteById = async (id) => {
  const rows = await Todo.destroy({ where: { id } });
  const success = rows === 1;

  return success;
};

module.exports = {
  findAll,
  findByName,
  insert,
  update,
  deleteById,
  updateLaneId,
};
