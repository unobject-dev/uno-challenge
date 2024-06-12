import { useMutation, useQuery } from "@apollo/client";
import { getOperationName } from "@apollo/client/utilities";
import { ListItem } from "@mui/material";
import { DELETE_ITEM_MUTATION, GET_TODO_LIST, UPDATE_ITEM_MUTATION } from "../queries";
import CustomListItem from "./CustomListItem";

function CustomList({ filter }) {
    const [deleteItem] = useMutation(DELETE_ITEM_MUTATION);
    const [updateItem] = useMutation(UPDATE_ITEM_MUTATION);
    const { data } = useQuery(GET_TODO_LIST, { variables: { filter } });

    /**
     * Remove um item da lista.
     * @param {*} item - 
     */
    const onDelete = async (item) => {
        await deleteItem({
            variables: {
                id: item.id
            },
            awaitRefetchQueries: true,
            refetchQueries: [getOperationName(GET_TODO_LIST)]
        });
    };

    /**
     * Atualiza um item da lista.
     * @param {*} item - Item que irá ser atualizado.
     * @param {*} name - Novo nome do item.
     */
    const onUpdate = async (item, name) => {
        await updateItem({
            variables: {
                values: {
                    id: item.id,
                    name
                },
            },
            awaitRefetchQueries: true,
            refetchQueries: [getOperationName(GET_TODO_LIST)],
        });
    };
    return (
        <>
            {data?.todoList?.map((value, index) => {
                return (
                    <ListItem
                        key={index}
                        disablePadding
                        sx={{
                            borderRadius: "5px",
                            marginTop: "5px",
                            marginBottom: "5px",
                        }}
                    >
                        <CustomListItem id={"id" + index} index={index} value={value} onUpdate={onUpdate} onDelete={onDelete} />
                    </ListItem>
                );
            })
            }
        </>
    )
}

export default CustomList;