import { useQuery } from '@apollo/client';
import { LANES_QUERY } from '../../api/graphql/queries';

export const useLanes = () => {
  const query = useQuery(LANES_QUERY, { fetchPolicy: 'cache-first' });
  return query;
};
