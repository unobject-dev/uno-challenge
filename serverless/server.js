const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { TODO_LIST } = require("./makeData");
const { GraphQLError } = require("graphql");

/**
 * Gera um número inteiro para utilizar de id
 */
function getRandomInt() {
  return Math.floor(Math.random() * 999);
}

const typeDefs = `#graphql
  type Item {
    id: Int
    name: String
  }

  input ItemInput {
    id: Int
    name: String
  }

  input ItemFilter {
    id: Int
    name: String
  }

  type Query {
    todoList(filter: ItemFilter): [Item]
  }

  type Mutation {
    addItem(values: ItemInput): Boolean
    updateItem(values: ItemInput): Boolean
    deleteItem(id: Int!): Boolean
  }
`;

const resolvers = {
  Query: {
    todoList: (_, { filter }) => {
      if (filter) return TODO_LIST.filter((item) => item.name.includes(filter.name));
      return TODO_LIST;
    },
  },
  Mutation: {
    addItem: (_, { values: { name } }) => {
      let founded = TODO_LIST.find((item) => item.name == name);
      if (founded) {
        throw new GraphQLError('An item with that name already exists.', {
          extensions: {
            code: '400',
          },
        });
      }
      TODO_LIST.push({
        id: getRandomInt(),
        name,
      });
    },
    updateItem: (_, { values: { id, name } }) => {
      let item = TODO_LIST.find((item) => item.id == id);
      item.name = name;
    },
    deleteItem: (_, { id }) => {
      let index = TODO_LIST.findIndex((item) => item.id == id);
      TODO_LIST.splice(index, 1);
    },
  },
};

// Configuração para subir o backend
const startServer = async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });

  console.log(`🚀  Server ready at: ${url}`);
};

startServer();
