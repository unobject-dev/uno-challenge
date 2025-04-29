const service = require('../../../src/modules/todo/todo.service');
const repo = require('../../../src/modules/todo/todo.repository');
jest.mock('../../../src/modules/todo/todo.repository');

beforeEach(() => { jest.clearAllMocks(); });

test('createItem trims name and inserts', async () => {
  repo.findByName.mockResolvedValue(null);
  repo.insert.mockResolvedValue({ id: 1, name: 'bread' });

  const ok = await service.createItem({ name: ' bread ' });

  expect(ok).toBe(true);
  expect(repo.insert).toHaveBeenCalledWith('bread');
});

test('createItem throws on duplicate and empty name', async () => {
  repo.findByName.mockResolvedValue({ id: 1 });
  await expect(service.createItem({ name: 'milk' }))
    .rejects.toThrow('Duplicate item');

  await expect(service.createItem({ name: '   ' }))
    .rejects.toThrow('Name cannot be empty');
});

test('renameItem happy path & not-found path', async () => {
  repo.updateNameById.mockResolvedValue(true);
  const ok = await service.renameItem({ id: 1, name: 'tea' });
  expect(ok).toBe(true);

  repo.updateNameById.mockResolvedValue(false);
  await expect(service.renameItem({ id: 9, name: 'x' }))
    .rejects.toThrow('Item not found');
});

test('removeItem happy path & not-found path', async () => {
  repo.deleteById.mockResolvedValue(true);
  const ok = await service.removeItem(1);
  expect(ok).toBe(true);

  repo.deleteById.mockResolvedValue(false);
  await expect(service.removeItem(99))
    .rejects.toThrow('Item not found');
});

test('listItems passes filter through', async () => {
  const list = [{ id: 1, name: 'milk' }];
  repo.findAll.mockResolvedValue(list);

  const out = await service.listItems({ name: 'milk' });

  expect(repo.findAll).toHaveBeenCalledWith({ name: 'milk' });
  expect(out).toBe(list);
});
