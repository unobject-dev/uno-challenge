const repo = require('../../../src/modules/todo/todo.repository');
const Todo = require('../../../src/modules/todo/todo.model');
jest.mock('../../../src/modules/todo/todo.model');

beforeEach(() => { jest.clearAllMocks(); });

test('insert returns created model', async () => {
  const created = { id: 1, name: 'milk' };
  Todo.create.mockResolvedValue(created);

  const out = await repo.insert('milk');

  expect(Todo.create).toHaveBeenCalledWith({ name: 'milk' });
  expect(out).toBe(created);
});

test('findAll covers all filter branches', async () => {
  const rows = [{ id: 1, name: 'milk' }];
  Todo.findAll.mockResolvedValue(rows);

  await repo.findAll();
  await repo.findAll({ id: 1 });
  await repo.findAll({ name: 'mi' });
  const out = await repo.findAll({ id: 1, name: 'mi' });

  expect(Todo.findAll).toHaveBeenCalledTimes(4);
  expect(out).toBe(rows);
});

test('updateNameById success and failure', async () => {
  Todo.update.mockResolvedValue([1]);
  const ok = await repo.updateNameById(1, 'coffee');
  expect(ok).toBe(true);

  Todo.update.mockResolvedValue([0]);
  const fail = await repo.updateNameById(2, 'tea');
  expect(fail).toBe(false);
});

test('deleteById success and failure', async () => {
  Todo.destroy.mockResolvedValue(1);
  const ok = await repo.deleteById(1);
  expect(ok).toBe(true);

  Todo.destroy.mockResolvedValue(0);
  const fail = await repo.deleteById(99);
  expect(fail).toBe(false);
});
