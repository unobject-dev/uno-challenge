import { useQuery } from '@apollo/client';
import { LANES_QUERY, LANES_TODOS_QUERY } from '../../api/graphql/queries';

export const useLanes = () => {
  const query = useQuery(LANES_QUERY, { fetchPolicy: 'cache-first' });
  return query;
};

export const useLanesWithTodos = () => {
  return useQuery(LANES_TODOS_QUERY, {
    variables: { filter: null },
    fetchPolicy: 'cache-first',
  });
};
