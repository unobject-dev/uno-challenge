const repo = require('./lane.repository');

const listLanes = async () => {
  const lanes = await repo.findAll();
  return lanes;
};

const listLanesWithTodo = async () => {
  const yago = await repo.laneWIthTodos();
  console.log(yago, 'yago')
  return yago;
};

const getLane = async (id) => {
  const lane = await repo.findById(id);
  return lane;
};

const addLane = async (values) => {
  const lane = await repo.create(values);
  return lane;
};

const editLane = async (id, values) => {
  const lane = await repo.update(id, values);
  return lane;
};

const deleteLane = async (id) => {
  const success = await repo.remove(id);
  return success;
};

module.exports = {
  listLanes,
  getLane,
  addLane,
  editLane,
  deleteLane,
  listLanesWithTodo,
};
