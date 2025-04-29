const repo = require('../../../src/modules/lane/lane.repository');
const Lane = require('../../../src/modules/lane/lane.model');
jest.mock('../../../src/modules/lane/lane.model');

beforeEach(() => { jest.clearAllMocks(); });

test('findAll returns rows', async () => {
    const rows = [{ id: 1 }];
    Lane.findAll.mockResolvedValue(rows);
    const out = await repo.findAll();
    expect(Lane.findAll).toHaveBeenCalledWith({ order: [['position', 'ASC']] });
    expect(out).toBe(rows);
});

test('findById returns row', async () => {
    const row = { id: 1 };
    Lane.findByPk.mockResolvedValue(row);
    const out = await repo.findById(1);
    expect(Lane.findByPk).toHaveBeenCalledWith(1);
    expect(out).toBe(row);
});

test('create returns created row', async () => {
    const row = { id: 1 };
    Lane.create.mockResolvedValue(row);
    const out = await repo.create({ name: 'lane' });
    expect(Lane.create).toHaveBeenCalledWith({ name: 'lane' });
    expect(out).toBe(row);
});

test('update returns updated row when found', async () => {
    const row = { id: 1, update: jest.fn() };
    Lane.findByPk.mockResolvedValue(row);
    const values = { name: 'new' };
    const out = await repo.update(1, values);
    expect(Lane.findByPk).toHaveBeenCalledWith(1);
    expect(row.update).toHaveBeenCalledWith(values);
    expect(out).toBe(row);
});

test('update returns null when not found', async () => {
    Lane.findByPk.mockResolvedValue(null);
    const out = await repo.update(2, { name: 'x' });
    expect(out).toBeNull();
});

test('remove returns true when one row deleted', async () => {
    Lane.destroy.mockResolvedValue(1);
    const ok = await repo.remove(1);
    expect(ok).toBe(true);
});

test('remove returns false when nothing deleted', async () => {
    Lane.destroy.mockResolvedValue(0);
    const ok = await repo.remove(99);
    expect(ok).toBe(false);
});
