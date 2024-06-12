import { Delete, Edit } from "@mui/icons-material";
import { TextField } from "@mui/material";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { useState } from "react";

function CustomListItem({ index, value, onUpdate, onDelete }) {
    const [text, setText] = useState(value.name);
    const [isEditing, setIsEditing] = useState(false);

    /**
     * Ação do botão de editar o item.
     * Caso não esteja editando e clicar no
     * botão de editar, muda o status da 
     * variável que define a edição do item.
     */
    function onEdit() {
        if (isEditing) {
            onUpdate(value, text);
        }
        setIsEditing(!isEditing);
    }

    return (
        <>
            <ListItemButton dense>
                {
                    isEditing ?
                        <TextField id={"id" + index} label="Digite aqui" value={text} type="text"
                            variant="standard" onChange={(e) => setText(e?.target?.value)} />
                        :
                        <ListItemText id={index} primary={value?.name} />
                }
                <Edit onClick={() => onEdit()} />
                <Delete onClick={() => onDelete(value)} />
            </ListItemButton>
        </>
    )
}

export default CustomListItem;