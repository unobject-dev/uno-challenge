import List from "@mui/material/List";
import { Button, TextField } from "@mui/material";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_ITEM_MUTATION, GET_TODO_LIST } from "../queries";

import { useContext, useEffect, useState } from "react";
import { getOperationName } from "@apollo/client/utilities";
// Separado para facilitar leitura do código
import {
	Container, ContainerTop, ContainerList,
	ContainerListItem, ContainerButton, ContainerError,
	Title
} from "./list-styles";
import { ItemToDo } from "../item/item-to-do";
import { DialogContext } from "../dialog/dialog-ctx";
import DialogWrapper from "../dialog/dialog-wrapper";

export default function CheckboxList() {
	const [item, setItem] = useState("");
	const [error, setError] = useState(null);
	const { data, refetch, } = useQuery(GET_TODO_LIST);
	const [addItem] = useMutation(ADD_ITEM_MUTATION, {
		onError: (error) => {
			setError({ message: error?.message, timeout: 10000 });
		}
	});
	const { data: hasCtxData } = useContext(DialogContext);

	// Configuração para esconder o erro depois de um determinado periodo de tempo em ms
	useEffect(() => {
		if (!error) return;

		const timer = setTimeout(() => {
			setError(null);
		}, error.timeout ?? 5000);

		return () => clearTimeout(timer);

	}, [error]);

	// Chamada para o backend de adição de um novo item
	const onSubmit = async (event) => {
		event.preventDefault();

		// Verifica se o valor é vazio ou é composto apenas por espaços
		if (!item.trim()) {
			setError({ message: "Não serão permitidos valores vazios!", timeout: 5000 });
			return;
		}

		await addItem({
			variables: {
				values: {
					name: item,
				},
			},
			awaitRefetchQueries: true,
			refetchQueries: [getOperationName(GET_TODO_LIST)],
		});
		setItem("");
	};

	// Filtro de itens do todo list
	const onFilter = async () => {
		refetch({
			filter: item ? { name: item } : null,
		});
	};

	return (
		<>
			<Container>
				<ContainerList>
					<Title>TODO LIST</Title>
					<ContainerTop onSubmit={onSubmit}>
						<TextField
							id="item"
							label="Digite aqui"
							value={item}
							type="text"
							variant="standard"
							onChange={(e) => setItem(e?.target?.value)}
						/>
						<ContainerButton>
							<Button
								variant="contained"
								sx={{ width: "100%" }}
								color="info"
								onClick={onFilter}
								type="button"
							>
								Filtrar
							</Button>
							<Button
								variant="contained"
								sx={{ width: "100%" }}
								color="success"
								type="submit"
							>
								Salvar
							</Button>
						</ContainerButton>
						{
							error && <ContainerError>{error.message}</ContainerError>
						}
					</ContainerTop>

					<List sx={{ width: "100%" }}>
						<ContainerListItem>
							{data?.todoList?.map((value, index) => {
								return (
									<ItemToDo key={index} value={value} />
								);
							})}
						</ContainerListItem>
					</List>
				</ContainerList>
				{hasCtxData && <DialogWrapper />}
			</Container>
		</>
	);
}
