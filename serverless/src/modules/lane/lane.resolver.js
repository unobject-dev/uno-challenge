const service = require('./lane.service');

const queryResolvers = {
  lanes: async () => {
    const rows = await service.listLanes();
    return rows;
  },

  lane: async (_parent, { id }) => {
    const row = await service.getLane(id);
    return row;
  },

  lanesWithItem: async (_parent, { id }) => {
    const rows = await service.listLanesWithTodo();
    return rows;
  },

};

const mutationResolvers = {
  createLane: async (_parent, { values }) => {
    const row = await service.addLane(values);
    return row;
  },

  updateLane: async (_parent, { id, values }) => {
    const row = await service.editLane(id, values);
    return row;
  },

  deleteLane: async (_parent, { id }) => {
    const ok = await service.deleteLane(id);
    return ok;
  },
};

module.exports = {
  Query: queryResolvers,
  Mutation: mutationResolvers,
};
