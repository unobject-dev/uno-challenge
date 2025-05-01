const repository = require('./todo.repository');

const listItems = async (filter) => {
  const list = await repository.findAll(filter);
  return list;
};

const createItem = async ({ name }) => {
  if (!name?.trim()) {
    throw new Error('Name cannot be empty');
  }

  const existing = await repository.findByName(name.trim());

  if (existing) {
    throw new Error('Duplicate item');
  }

  await repository.insert(name.trim());
};

const renameItem = async (todo) => {
  const todoId = todo.id;
  delete todo.id;

  if (todo.name && !todo.name?.trim()) {
    throw new Error('Name cannot be empty');
  }

  const updated = await repository.update(todoId, todo);

  if (!updated) {
    throw new Error('Item not found');
  }

  return true;
};

const removeItem = async (id) => {
  const removed = await repository.deleteById(id);

  if (!removed) {
    throw new Error('Item not found');
  }

  return true;
};

module.exports = {
  listItems,
  createItem,
  renameItem,
  removeItem,
};
