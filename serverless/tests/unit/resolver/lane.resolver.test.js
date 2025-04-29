const resolvers = require('../../../src/modules/lane/lane.resolver');
const service = require('../../../src/modules/lane/lane.service');
jest.mock('../../../src/modules/lane/lane.service');

beforeEach(() => { jest.clearAllMocks(); });

test('Query.lanes delegates', async () => {
    const rows = [{ id: 1 }];
    service.listLanes.mockResolvedValue(rows);
    const out = await resolvers.Query.lanes();
    expect(service.listLanes).toHaveBeenCalled();
    expect(out).toBe(rows);
});

test('Query.lane delegates', async () => {
    const row = { id: 1 };
    service.getLane.mockResolvedValue(row);
    const out = await resolvers.Query.lane(null, { id: 1 });
    expect(service.getLane).toHaveBeenCalledWith(1);
    expect(out).toBe(row);
});

test('Mutation.createLane delegates', async () => {
    const row = { id: 1 };
    service.addLane.mockResolvedValue(row);
    const out = await resolvers.Mutation.createLane(null, { values: { name: 'lane' } });
    expect(service.addLane).toHaveBeenCalledWith({ name: 'lane' });
    expect(out).toBe(row);
});

test('Mutation.updateLane delegates', async () => {
    const row = { id: 1 };
    service.editLane.mockResolvedValue(row);
    const out = await resolvers.Mutation.updateLane(null, { id: 1, values: { name: 'edit' } });
    expect(service.editLane).toHaveBeenCalledWith(1, { name: 'edit' });
    expect(out).toBe(row);
});

test('Mutation.deleteLane delegates', async () => {
    service.deleteLane.mockResolvedValue(true);
    const ok = await resolvers.Mutation.deleteLane(null, { id: 1 });
    expect(service.deleteLane).toHaveBeenCalledWith(1);
    expect(ok).toBe(true);
});
