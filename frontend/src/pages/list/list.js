import { useMutation, useQuery } from "@apollo/client";
import { ADD_ITEM_MUTATION, GET_TODO_LIST } from "../../queries/itens";
import List from "@mui/material/List";
import { Button, TextField } from "@mui/material";
import { Refresh } from "@mui/icons-material";

import { useEffect, useState } from "react";
import { getOperationName } from "@apollo/client/utilities";
// Separado para facilitar leitura do código
import {
	Container, ContainerTop, ContainerCard,
	ContainerListItem, ContainerButton, ContainerInput, ContainerError,
	Title
} from "../../styles/comps-list";
import { ItemToDo } from "./item";

import { useParams } from "react-router-dom";

const ERROR_MESSAGE_TIMEOUT = 10000;
const DEFAULT_MESSAGE_TIMEOUT = 5000;

export default function CheckboxList() {
	const params = useParams();
	const [item, setItem] = useState("");
	const [error, setError] = useState(null);
	const { data, refetch, loading } = useQuery(GET_TODO_LIST, {
		variables: {
			id: Number(params.id),
		},
	});
	const [addItem] = useMutation(ADD_ITEM_MUTATION, {
		onError: (error) => {
			setError({ message: error?.message, timeout: ERROR_MESSAGE_TIMEOUT });
		}
	});


	// Configuração para esconder o erro depois de um determinado periodo de tempo em ms
	useEffect(() => {
		if (!error) return;

		const timer = setTimeout(() => {
			setError(null);
		}, error.timeout ?? DEFAULT_MESSAGE_TIMEOUT);

		return () => clearTimeout(timer);
	}, [error]);

	// Chamada para o backend de adição de um novo item
	const onSubmit = async (event) => {
		event.preventDefault();

		// Verifica se o valor é vazio ou é composto apenas por espaços
		if (!item.trim()) {
			setError({ message: "Não serão permitidos valores vazios!", timeout: DEFAULT_MESSAGE_TIMEOUT });
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
			onCompleted: () => {
				setItem("");
				setError(null);
			}
		});
	};

	// Filtro de itens do todo list
	const onFilter = (clear = false) => {
		const value = !clear ? item : '';
		if (clear) {
			setItem("");
		}

		refetch({
			filter: value ? { name: value } : null,
			id: Number(params.id)
		});
	};

	return (
		<div className="App-header">
			<Container>
				<ContainerCard>
					<Title>TODO LIST</Title>
					<ContainerTop onSubmit={onSubmit}>
						<ContainerInput>
							<TextField
								id="item"
								label="Digite aqui"
								value={item}
								type="text"
								variant="standard"
								sx={{ width: "100%" }}
								onChange={(e) => setItem(e.target.value)}
							/>
							<Button variant="contained" sx={{ width: "42px", height: "42px", minWidth: "0px" }} color="info" type="button"
								onClick={() => onFilter(true)}>
								<Refresh />
							</Button>
						</ContainerInput>
						<ContainerButton>
							<Button
								variant="contained"
								sx={{ width: "100%" }}
								color="info"
								onClick={() => onFilter(false)}
								type="button"
							> Filtrar </Button>
							<Button
								variant="contained"
								sx={{ width: "100%" }}
								color="success"
								type="submit"
							> Salvar </Button>
						</ContainerButton>
						{
							error && <ContainerError>{error.message}</ContainerError>
						}
					</ContainerTop>

					{
						(!loading && data?.todoList?.length > 0) && <List sx={{ width: "100%" }}>
							<ContainerListItem>
								{data?.todoList?.map((value) =>
									<ItemToDo key={value?.id} value={value} />
								)}
							</ContainerListItem>
						</List>
					}
					{(!loading && !data?.todoList?.length) && <p>Nenhum item encontrado</p>}
					{loading && <p>Carregando...</p>}
				</ContainerCard>
			</Container>
		</div>
	);
}
