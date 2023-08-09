import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { Button, TextField } from "@mui/material";
import { styled } from "styled-components";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_ITEM_MUTATION, GET_TODO_LIST } from "./queries";
import { Delete, Edit } from "@mui/icons-material";
import { useState } from "react";
import { getOperationName } from "@apollo/client/utilities";

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

const ContainerButton = styled.div`
  display: flex;
  justify-content: space-around;
  gap: 10px;
`;

const Title = styled.div`
  font-weight: bold;
  font-size: 28px;
`;

export default function CheckboxList() {
  const [item, setItem] = useState("");
  const { data } = useQuery(GET_TODO_LIST);

  const [addItem] = useMutation(ADD_ITEM_MUTATION);

  const onSubmit = async (event) => {
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
  };

  const onDelete = async (event) => {
    console.log(onDelete);
    // Aqui você irá implementar a chamada para o backend de remoção de item
  };

  const onUpdate = async (event) => {
    console.log(onUpdate);
    // Aqui você irá implementar a chamada para o backend de edição de item
  };

  const onFilter = async (event) => {
    console.log(onFilter);
    // Aqui você irá implementar a chamada para o backend para fazer o filtro
  };

  return (
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
        </ContainerTop>
        <List sx={{ width: "100%" }}>
          <ContainerListItem>
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
                  <ListItemButton dense>
                    <ListItemText id={index} primary={value?.name} />
                    <Edit onClick={onUpdate} />
                    <Delete onClick={onDelete} />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </ContainerListItem>
        </List>
      </ContainerList>
    </Container>
  );
}
