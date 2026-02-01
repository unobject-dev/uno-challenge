import { Link } from "react-router-dom";
import { Add, Delete } from "@mui/icons-material";
import { Fab, Modal, Fade, Box, Typography, Backdrop, TextField, Button, IconButton } from "@mui/material";
import { useMutation, useQuery } from "@apollo/client";
import { getOperationName } from "@apollo/client/utilities";
import {
	GridContainer,
	Header,
	Main,
	Card
} from "../../styles/comps-home";
import { useState, useContext } from "react";
import { GET_TODO_LISTS, ADD_TODO_LIST_MUTATION, DELETE_TODO_LIST_MUTATION } from "../../queries/listas";
import { DefaultContext } from "../../context/ctx";
import DialogWrapper from "../../util/dialog-wrapper";

const modalStyle = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	bgcolor: 'background.paper',
	border: '2px solid #000',
	boxShadow: 24,
	p: 4,
};

export default function Home() {
	const [open, setOpen] = useState(false);
	const [listName, setListName] = useState("");
	const [error, setError] = useState(null);
	const { setCtxData, ctxData } = useContext(DefaultContext);
	const { data, loading } = useQuery(GET_TODO_LISTS);

	const [addTodoList] = useMutation(ADD_TODO_LIST_MUTATION, {
		awaitRefetchQueries: true,
		refetchQueries: [getOperationName(GET_TODO_LISTS)],
		onError: (error) => {
			setError(error.message);
		}
	});

	const [deleteTodoList] = useMutation(DELETE_TODO_LIST_MUTATION, {
		awaitRefetchQueries: true,
		refetchQueries: [getOperationName(GET_TODO_LISTS)],
		onError: (error) => {
			setError(error.message);
		}
	});

	const handleSave = async () => {
		if (!listName.trim()) {
			setError("O nome da lista não pode estar vazio!");
			return;
		}

		await addTodoList({
			variables: { name: listName },
			onCompleted: () => {
				setListName("");
				setError(null);
				setOpen(false);
			}
		});
	};

	const handleCancel = () => {
		setListName("");
		setError(null);
		setOpen(false);
	};

	const handleDelete = async (id) => {
		setCtxData((prev) => (
			{
				...prev,
				dialog: {
					title: "Confirmar exclusão",
					message: "Deseja realmente deletar esta lista?",
					buttons: {
						confirm: () => {
							deleteTodoList({ variables: { id } });
							setCtxData((prev) => ({ ...prev, dialog: false }));
						}
					}
				}
			}
		));
	};

	return (
		<>
			<GridContainer>
				<Header>
					Gerenciador de listas
					<Fab
						color="primary"
						sx={{
							position: 'absolute',
							right: 16,
							top: '50%',
							transform: 'translateY(-50%)',
							borderRadius: '8px'
						}}
						onClick={() => setOpen(true)}
					> <Add /> </Fab>
				</Header>

				<Main>
					{loading && <Typography color="#FFFFFF">Carregando...</Typography>}
					{!loading && (!data || data?.todoLists?.length === 0) && (
						<Typography variant="h6" color="#FFFFFF">
							Nenhuma lista encontrada. Clique no botão + para criar uma nova lista.
						</Typography>
					)}
					{!loading && data?.todoLists?.map((list) => (
						<Card key={list.id}>
							<Link to={`/list/${list.id}`}>{list.name}</Link>
							<IconButton
								color="error"
								sx={{
									position: 'absolute',
									top: 8,
									right: 8,
								}}
								onClick={(e) => handleDelete(list.id)}
							> <Delete /> </IconButton>
						</Card>
					))}
				</Main>
			</GridContainer>

			<Modal
				open={open}
				onClose={handleCancel}
				closeAfterTransition
				slots={{ backdrop: Backdrop }}
				slotProps={{
					backdrop: {
						timeout: 500,
					},
				}}
			>
				<Fade in={open}>
					<Box sx={modalStyle}>
						<Typography variant="h6" component="h2">
							Adicionar nova todo list
						</Typography>

						<TextField
							label="Nome da lista"
							value={listName}
							type="text"
							variant="standard"
							sx={{ width: "100%", mt: 2 }}
							onChange={(e) => setListName(e.target.value)}
							error={!!error}
							helperText={error}
						/>

						<Box sx={{ display: "flex", gap: 2, mt: 3 }}>
							<Button variant="contained" color="success" onClick={handleSave}>Salvar</Button>
							<Button variant="contained" color="error" onClick={handleCancel}>Cancelar</Button>
						</Box>
					</Box>
				</Fade>
			</Modal>

			{ctxData.dialog && <DialogWrapper />}
		</>
	);
}