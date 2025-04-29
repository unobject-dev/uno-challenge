const Lane = require('./lane.model');

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
};
