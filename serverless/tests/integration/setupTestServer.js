const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');
const { typeDefs, resolvers } = require('../../src/schema');
const sequelize = require('../../src/db');

const startTestServer = async () => {
  await sequelize.authenticate();
  await sequelize.sync({ force: true }); 

  const server = new ApolloServer({ typeDefs, resolvers });
  const { url } = await startStandaloneServer(server, { listen: { port: 0 } });

  return { server, url };
};

module.exports = { startTestServer };
