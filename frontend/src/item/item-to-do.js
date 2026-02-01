import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { ContainerError } from "./item-styles";

import { Delete, Edit } from "@mui/icons-material";
import { useMutation } from "@apollo/client";
import { DELETE_ITEM_MUTATION, GET_TODO_LIST, UPDATE_ITEM_MUTATION } from "../queries";
import { getOperationName } from "@apollo/client/utilities";
import { useContext, useState } from "react";
import { DialogContext } from "../dialog/dialog-ctx";

export function ItemToDo({ value }) {
	const [isEditing, setIsEditing] = useState(false);
	const [editedName, setEditedName] = useState("");
	const [error, setError] = useState("");
	const [updateItem] = useMutation(UPDATE_ITEM_MUTATION);
	const [deleteItem] = useMutation(DELETE_ITEM_MUTATION);
	const { setData } = useContext(DialogContext);

	// Chamada para o para deletar o item selecionado
	const onDeleteConfirm = async () => {
		setData({
			title: "Confirmar exclusão",
			message: "Deseja realmente deletar este item?",
			buttons: {
				confirm: () => onDelete(value?.id)
			}
		});
	}
	const onDelete = async (itemId) => {
		await deleteItem({
			variables: {
				id: itemId
			},
			awaitRefetchQueries: true,
			refetchQueries: [getOperationName(GET_TODO_LIST)],
			onError: (error) => {
				setError(error?.message);
			}
		});
		setData(false);
	};

	// Muda o estilo do item para modo de edição de valores
	const onEdit = () => {
		setEditedName(value?.name);
		setIsEditing(true);
	};

	// Chamada para o backend para atualizar o item selecionado
	const onUpdate = async (itemId) => {
		await updateItem({
			variables: {
				values: {
					id: itemId,
					name: editedName,
				},
			},
			awaitRefetchQueries: true,
			refetchQueries: [getOperationName(GET_TODO_LIST)],
			onCompleted: () => {
				// Retorna o item para o modo de visualização
				setIsEditing(false);
			},
			onError: (error) => {
				setError(error?.message);
			}
		});
	};

	return <ListItem
		disablePadding
		sx={{
			borderRadius: "5px",
			marginTop: "5px",
			marginBottom: "5px",
			flexDirection: "column",
			alignItems: "stretch",
		}}
	>
		<ListItemButton dense>
			{
				!isEditing && <>
					<ListItemText id={value?.id} primary={value?.name} />
					<Edit onClick={onEdit} />
					<Delete onClick={() => onDeleteConfirm()} />
				</>
			}
			{
				isEditing && <>
					<TextField
						id="item"
						label="Digite o nome da tarefa"
						sx={{ width: "80%" }}
						value={editedName}
						onChange={(e) => setEditedName(e.target.value)}
						type="text"
						variant="standard"
					/>
					<Button
						variant="contained"
						sx={{ width: "20%" }}
						color="success"
						onClick={() => onUpdate(value?.id)}
					>
						Salvar
					</Button>
				</>
			}
		</ListItemButton>
		{
			error && <ContainerError>{error}</ContainerError>
		}
	</ListItem >
}