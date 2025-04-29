const resolvers = require('../../../src/modules/todo/todo.resolver');
const service = require('../../../src/modules/todo/todo.service');
jest.mock('../../../src/modules/todo/todo.service');

beforeEach(() => {
  jest.clearAllMocks();
});

test('Query.todoList delegates and returns list', async () => {
  const list = [{ id: 1, name: 'milk' }];
  service.listItems.mockResolvedValue(list);

  const result = await resolvers.Query.todoList(null, { filter: {} });

  expect(service.listItems).toHaveBeenCalled();
  expect(result).toBe(list);
});

test('Mutation.addItem delegates', async () => {
  service.createItem.mockResolvedValue(true);

  const ok = await resolvers.Mutation.addItem(null, { values: { name: 'tea' } });

  expect(ok).toBe(true);
  expect(service.createItem).toHaveBeenCalledWith({ name: 'tea' });
});

test('Mutation.updateItem delegates', async () => {
  service.renameItem.mockResolvedValue(true);

  const ok = await resolvers.Mutation.updateItem(null, { values: { id: 1, name: 'coffee' } });

  expect(ok).toBe(true);
  expect(service.renameItem).toHaveBeenCalledWith({ id: 1, name: 'coffee' });
});

test('Mutation.deleteItem delegates', async () => {
  service.removeItem.mockResolvedValue(true);

  const ok = await resolvers.Mutation.deleteItem(null, { id: 1 });

  expect(ok).toBe(true);
  expect(service.removeItem).toHaveBeenCalledWith(1);
});
