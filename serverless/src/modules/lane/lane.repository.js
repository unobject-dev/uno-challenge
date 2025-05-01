const Lane = require('./lane.model');
const Todo = require('../todo/todo.model');
const { Op } = require('sequelize');

const laneWIthTodos = async (filter) => {
  const todoWhere = filter?.name ? { name: { [Op.iLike]: `%${filter.name}%` } } : undefined;

  const lanes = await Lane.findAll({
    include: {
      model: Todo,
      as: 'todos',
      where: todoWhere,
      required: false,
    },
    order: [['position', 'ASC']],
  });

  return lanes.map((lane) => lane.get({ plain: true }));
};

const findAll = async () => {
  const rows = await Lane.findAll({ order: [['position', 'ASC']] });
  return rows;
};

const findById = async (id) => {
  const row = await Lane.findByPk(id);
  return row;
};

const create = async (values) => {
  const row = await Lane.create(values);
  return row;
};

const update = async (id, values) => {
  const row = await Lane.findByPk(id);

  if (row) {
    await row.update(values);
  }

  return row;
};

const remove = async (id) => {
  const deletedRows = await Lane.destroy({ where: { id } });
  const success = deletedRows === 1;
  return success;
};

module.exports = {
  findAll,
  findById,
  create,
  update,
  remove,
  laneWIthTodos,
};
