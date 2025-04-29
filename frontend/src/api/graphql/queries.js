import { gql } from '@apollo/client';

export const TODOS_QUERY = gql`
  query Todos($filter: ItemFilter) {
    todoList(filter: $filter) {
      id
      name
    }
  }
`;

export const ADD_TODO    = gql`mutation ($values: ItemInput){ addItem(values:$values) }`;
export const UPDATE_TODO = gql`mutation ($values: ItemInput){ updateItem(values:$values) }`;
export const DELETE_TODO = gql`mutation ($id:Int!){ deleteItem(id:$id) }`;

export const LANES_QUERY = gql`
  query Lanes {
    lanes {
      id
      name
      position
    }
  }
`;
