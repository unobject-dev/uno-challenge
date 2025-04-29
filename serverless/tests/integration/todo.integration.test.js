const request = require('supertest');
const { startTestServer } = require('./setupTestServer');

let server, url;

beforeAll(async () => {
  ({ server, url } = await startTestServer());
});

afterAll(async () => {
  await server.stop();
});

test('full CRUD round-trip', async () => {
  await request(url)
    .post('/')
    .send({
      query: 'mutation($name:String!){ addItem(values:{name:$name}) }',
      variables: { name: 'milk' },
    })
    .expect(200)
    .expect(({ body }) => { expect(body.data.addItem).toBe(true); });

  const read = await request(url)
    .post('/')
    .send({ query: '{ todoList { id name } }' });

  const item = read.body.data.todoList.find((i) => i.name === 'milk');
  expect(item).toBeDefined();
  const id = item.id;

  await request(url)
    .post('/')
    .send({
      query: 'mutation($id:Int!,$name:String!){ updateItem(values:{id:$id,name:$name}) }',
      variables: { id, name: 'coffee' },
    })
    .expect(({ body }) => { expect(body.data.updateItem).toBe(true); });

  await request(url)
    .post('/')
    .send({
      query: 'mutation($id:Int!){ deleteItem(id:$id) }',
      variables: { id },
    })
    .expect(({ body }) => { expect(body.data.deleteItem).toBe(true); });
});
