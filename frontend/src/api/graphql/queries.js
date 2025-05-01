import { gql } from '@apollo/client';

export const TODOS_QUERY = gql`
  query Todos($filter: ItemFilter) {
    todoList(filter: $filter) {
      id
      name
      lane_id
    }
  }
`;

export const ADD_TODO    = gql`mutation ($values: ItemInput!){ addItem(values:$values) }`;

export const UPDATE_TODO = gql`mutation ($values: ItemInput!){ updateItem(values:$values) }`;

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

export const LANES_TODOS_QUERY = gql`
  query LanesWithItem($filter: ItemFilter) {
    lanesWithItem(filter: $filter) {
      id
      name
      position
      todos {
        id
        name
        lane_id
      }
    }
  }
`;
