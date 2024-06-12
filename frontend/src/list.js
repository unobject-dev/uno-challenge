import { useMutation } from "@apollo/client";
import { getOperationName } from "@apollo/client/utilities";
import { Alert, Collapse } from "@mui/material";
import List from "@mui/material/List";
import { useState } from "react";
import styled from "styled-components";
import CustomActions from "./components/CustomActions";
import CustomList from "./components/CustomList";
import { ADD_ITEM_MUTATION, GET_TODO_LIST } from "./queries";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ContainerTop = styled.form`
  display: flex;
  background-color: #dcdcdc;
  flex-direction: column;
  justify-content: center;
  padding: 10px;
  gap: 10px;
  border-radius: 5px;
`;

const ContainerList = styled.div`
  display: flex;
  width: 600px;
  background-color: #dcdcdc;
  flex-direction: column;
  justify-content: center;
  padding: 10px;
  gap: 10px;
  border-radius: 5px;
`;
const ContainerListItem = styled.div`
  background-color: #efefef;
  padding: 10px;
  border-radius: 5px;
  max-height: 400px;
  overflow: auto;
`;

const Title = styled.div`
  font-weight: bold;
  font-size: 28px;
`;

export default function CheckboxList() {
  const [item, setItem] = useState("");
  const [filter, setFilter] = useState();
  const [error, setError] = useState(false);

  const [addItem] = useMutation(ADD_ITEM_MUTATION);

  /**
   * Adiciona um item na lista.
   * @param {*} event - Evento do click do botão salvar.
   */
  const onSubmit = async (event) => {
    try {
      event.preventDefault();
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
    }
    catch (e) {
      setError(true);
    }
  };

  /**
   * Realiza o filtro da listagem.
   */
  const onFilter = async () => {
    setFilter({ name: item });
  };

  return (
    <Container>
      <Collapse in={error}>
        <Alert severity="warning" onClose={() => { setError(false) }}>
          Oops!. Já existe um item com esse nome.
        </Alert>
      </Collapse>
      <ContainerList>
        <Title>TODO LIST</Title>
        <ContainerTop onSubmit={onSubmit}>
          <CustomActions item={item} setItem={setItem} onFilter={onFilter} />
        </ContainerTop>
        <List sx={{ width: "100%" }}>
          <ContainerListItem>
            <CustomList filter={filter} />
          </ContainerListItem>
        </List>
      </ContainerList>
    </Container>
  );
}
