const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');
const { typeDefs, resolvers } = require('./schema');
const sequelize = require('./db');

const start = async () => {
  await sequelize.authenticate();
  await sequelize.sync();

  const server = new ApolloServer({ typeDefs, resolvers });
  const { url } = await startStandaloneServer(server, { listen: { port: 4000 } });

  console.log(`🚀  Server ready at ${url}`);
};

start();
