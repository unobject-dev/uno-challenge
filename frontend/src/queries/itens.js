import { gql } from "@apollo/client";

// Busca os elementos de uma lista específica
export const GET_TODO_LIST = gql`
	query todoList($filter: ItemFilter, $id: Int) {
		todoList(filter: $filter, id: $id) {
			id
			name
		}
	}
`;

// Adiciona um item em uma lista 
export const ADD_ITEM_MUTATION = gql`
	mutation addItem($values: ItemInput) {
		addItem(values: $values)
	}
`;

// Remove um item de uma lista
export const DELETE_ITEM_MUTATION = gql`
	mutation deleteItem($id: Int!) {
		deleteItem(id: $id)
	}
`;

// Atualiza um item de uma lista
export const UPDATE_ITEM_MUTATION = gql`
	mutation updateItem($values: ItemInput) {
		updateItem(values: $values)
	}
`;