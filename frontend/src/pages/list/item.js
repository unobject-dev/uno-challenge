import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { ContainerError } from "../../styles/comps-item";

import { Delete, Edit, Save, ArrowBack } from "@mui/icons-material";
import { useMutation } from "@apollo/client";
import { DELETE_ITEM_MUTATION, GET_TODO_LIST, UPDATE_ITEM_MUTATION } from "../../queries/itens";
import { getOperationName } from "@apollo/client/utilities";
import { useContext, useEffect, useState } from "react";
import { DefaultContext } from "../../context/ctx";

export function ItemToDo({ value }) {
	const [isEditing, setIsEditing] = useState(false);
	const [editedName, setEditedName] = useState("");
	const [error, setError] = useState("");
	const [updateItem] = useMutation(UPDATE_ITEM_MUTATION);
	const [deleteItem] = useMutation(DELETE_ITEM_MUTATION);
	const { setCtxData } = useContext(DefaultContext);

	useEffect(() => {
		if (!error) return;

		const timer = setTimeout(() => {
			setError("");
		}, 10000);

		return () => clearTimeout(timer);
	}, [error]);

	// Abre o alerta de confirmação de exclusão
	const onDeleteConfirm = () => {
		setCtxData((prev) => ({
			...prev,
			dialog: {
				title: "Confirmar exclusão",
				message: "Deseja realmente deletar este item?",
				buttons: {
					confirm: () => onDelete(value?.id)
				}
			}
		}));
	}

	// Deleta o item selecionado
	const onDelete = async (itemId) => {
		await deleteItem({
			variables: {
				id: itemId
			},
			awaitRefetchQueries: true,
			refetchQueries: [getOperationName(GET_TODO_LIST)],
			onError: (error) => {
				setError(error?.message);
			},
			onCompleted: () => {
				setCtxData((prev) => ({
					...prev,
					dialog: false
				}));
			}
		});
	};

	// Muda o estilo do item para modo de edição de valores
	const onEdit = () => {
		setEditedName(value?.name);
		setIsEditing(true);
	};

	// Chamada para o backend para atualizar o item selecionado
	const onUpdate = async (itemId) => {
		if (!editedName.trim()) {
			setError("Não serão permitidos valores vazios!");
			return;
		}

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
		<ListItemButton dense sx={{ gap: "10px" }}>
			{
				!isEditing && <>
					<ListItemText id={value?.id} primary={value?.name} />
					<Edit onClick={onEdit} />
					<Delete onClick={onDeleteConfirm} />
				</>
			}
			{
				isEditing && <>
					<TextField
						id="item"
						label="Digite o nome da tarefa"
						sx={{ width: "100%" }}
						value={editedName}
						onChange={(e) => setEditedName(e.target.value)}
						type="text"
						variant="standard"
					/>
					{/* Botão de salvar */}
					<Button
						variant="contained"
						sx={{ width: "42px", height: "42px", minWidth: "0px", cursor: "pointer" }}
						color="success"
						onClick={() => onUpdate(value?.id)}
					>
						<Save />
					</Button>
					{/* Botão de cancelar */}
					<Button
						variant="contained"
						sx={{ width: "42px", height: "42px", minWidth: "0px", cursor: "pointer" }}
						color="info"
						onClick={() => setIsEditing(false)}
					>
						<ArrowBack />
					</Button>
				</>
			}
		</ListItemButton>
		{
			error && <ContainerError>{error}</ContainerError>
		}
	</ListItem >
}