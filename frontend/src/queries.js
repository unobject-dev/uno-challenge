import { gql } from "@apollo/client";

export const GET_TODO_LIST = gql`
  query todoList {
    todoList {
      id
      name
    }
  }
`;

export const ADD_ITEM_MUTATION = gql`
  mutation addItem($values: ItemInput) {
    addItem(values: $values)
  }
`;
