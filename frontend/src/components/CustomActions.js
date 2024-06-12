import { Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import styled from "styled-components";

const ContainerButton = styled.div`
  display: flex;
  justify-content: space-around;
  gap: 10px;
`;

function CustomActions({ item, setItem, onFilter }) {
    const [isValid, setIsValid] = useState(false);

    useEffect(() => {
        if (item?.trim()) {
            setIsValid(true);
        } else {
            setIsValid(false);
        }
    }, [item])

    return (
        <>
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
                    disabled={!isValid}
                >
                    Salvar
                </Button>
            </ContainerButton>
        </>
    )
}

export default CustomActions;