import { gql } from "@apollo/client";

// Busca todas as listas
export const GET_TODO_LISTS = gql`
	query todoLists {
		todoLists {
			id
			name
			items {
				id
				name
			}
		}
	}
`;

// Cria uma nova lista
export const ADD_TODO_LIST_MUTATION = gql`
	mutation addTodoList($name: String!) {
		addTodoList(name: $name) {
			id
			name
			items {
				id
				name
			}
		}
	}
`;

// Remove uma lista
export const DELETE_TODO_LIST_MUTATION = gql`
	mutation deleteTodoList($id: Int!) {
		deleteTodoList(id: $id)
	}
`;