const service = require('./todo.service');

const queryResolvers = {
  todoList: async (_p, { filter }) => {
    const result = await service.listItems(filter);
    return result;
  },
};

const mutationResolvers = {
  addItem: async (_p, { values }) => {
    const result = await service.createItem(values);
    return result;
  },
  updateItem: async (_p, { values }) => {
    const result = await service.renameItem(values);
    return result;
  },
  deleteItem: async (_p, { id }) => {
    const result = await service.removeItem(id);
    return result;
  },
};

module.exports = {
  Query: queryResolvers,
  Mutation: mutationResolvers,
};
