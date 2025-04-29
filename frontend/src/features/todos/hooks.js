import { useQuery, useMutation } from '@apollo/client';
import {
    TODOS_QUERY,
    ADD_TODO,
    UPDATE_TODO,
    DELETE_TODO,
} from '../../api/graphql/queries';
import { getOperationName } from '@apollo/client/utilities';

const TODOS_OP_NAME = getOperationName(TODOS_QUERY);

export const useTodos = () => {
    const query = useQuery(TODOS_QUERY);
    return query;
};

export const useAddTodo = () => {
    const mutation = useMutation(ADD_TODO, {
        refetchQueries: [TODOS_OP_NAME],
        awaitRefetchQueries: true,
    });

    return mutation;
};

export const useUpdateTodo = () => {
    const mutation = useMutation(UPDATE_TODO, {
        refetchQueries: [TODOS_OP_NAME],
        awaitRefetchQueries: true,
    });
    return mutation;
};

export const useDeleteTodo = () => {
    const mutation = useMutation(DELETE_TODO, {
        refetchQueries: [TODOS_OP_NAME],
        awaitRefetchQueries: true,
    });
    return mutation;
};
