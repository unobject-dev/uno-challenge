const service = require('../../../src/modules/lane/lane.service');
const repo = require('../../../src/modules/lane/lane.repository');
jest.mock('../../../src/modules/lane/lane.repository');

beforeEach(() => { jest.clearAllMocks(); });

test('listLanes delegates', async () => {
    const rows = [{ id: 1 }];
    repo.findAll.mockResolvedValue(rows);
    const out = await service.listLanes();
    expect(repo.findAll).toHaveBeenCalled();
    expect(out).toBe(rows);
});

test('getLane delegates', async () => {
    const row = { id: 1 };
    repo.findById.mockResolvedValue(row);
    const out = await service.getLane(1);
    expect(repo.findById).toHaveBeenCalledWith(1);
    expect(out).toBe(row);
});

test('addLane delegates', async () => {
    const row = { id: 1 };
    repo.create.mockResolvedValue(row);
    const out = await service.addLane({ name: 'lane' });
    expect(repo.create).toHaveBeenCalledWith({ name: 'lane' });
    expect(out).toBe(row);
});

test('editLane delegates', async () => {
    const row = { id: 1 };
    repo.update.mockResolvedValue(row);
    const out = await service.editLane(1, { name: 'edit' });
    expect(repo.update).toHaveBeenCalledWith(1, { name: 'edit' });
    expect(out).toBe(row);
});

test('deleteLane delegates', async () => {
    repo.remove.mockResolvedValue(true);
    const ok = await service.deleteLane(1);
    expect(repo.remove).toHaveBeenCalledWith(1);
    expect(ok).toBe(true);
});
