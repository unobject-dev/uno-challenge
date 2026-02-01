const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { TODO_LIST } = require("./makeData");

/**
 * Gera um número inteiro para utilizar de id
 */
function getRandomInt() {
	return Math.floor(Math.random() * 999);
}

/**
 * Busca o indice de um item pelo id
 */
function getIndexById(id) {
	return TODO_LIST.findIndex(e => e.id == id);
}

/**
 * Verifica se um item de mesmo nome ja existe
 */
function checkItemExists(name) {
	return TODO_LIST.find(e => e.name.toLowerCase() === name.toLowerCase());
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
		// Filtro dos itens
		todoList: (_, { filter }) => {
			if (filter && filter.name) {
				const needle = filter.name.toLowerCase();
				const result = TODO_LIST.filter(e => e.name.toLowerCase().includes(needle));
				return result;
			}
			return TODO_LIST;
		},
	},
	Mutation: {
		addItem: (_, { values: { name } }) => {
			if (checkItemExists(name)) {
				return new Error("Um item de mesmo nome foi encontrado na todo-list!");
			}

			TODO_LIST.push({
				id: getRandomInt(),
				name,
			});
		},
		// Edição do item
		updateItem: (_, { values: { id, name } }) => {
			// Buscando o indice do item no vetor
			const index = getIndexById(id);
			if (index > -1) {
				if (TODO_LIST[index].name !== name && checkItemExists(name)) {
					return new Error("Um item de mesmo nome foi encontrado na todo-list!");
				}

				// Atualizando o item
				TODO_LIST[index].name = name;
			}
			return true;
		},
		// Remoção do item
		deleteItem: (_, { id }) => {
			// Buscando o indice do item no vetor
			const index = getIndexById(id);
			if (index > -1) {
				// Removendo o item do vetor
				TODO_LIST.splice(index, 1);
			}
			return true;
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
