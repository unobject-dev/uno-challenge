import { useState } from 'react';
import {
  ListItem,
  ListItemButton,
  ListItemText,
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { Draggable } from '@hello-pangea/dnd';
import RenameTodoModal from './RenameTodoModal';

const TodoItem = ({ todo, index }) => {
  const [openRename, setOpenRename] = useState(false);

  const remove = () => {};

  const rename = () => {
    setOpenRename(true);
  };

  return (
    <>
      <Draggable draggableId={String(todo.id)} index={index}>
        {(prov) => (
          <ListItem
            ref={prov.innerRef}
            {...prov.draggableProps}
            {...prov.dragHandleProps}
            disablePadding
            sx={{ mb: 1, borderRadius: 1, background: '#fff' }}
          >
            <ListItemButton dense>
              <ListItemText primary={todo.name} />
              <Edit sx={{ cursor: 'pointer', mr: 1 }} onClick={rename} />
              <Delete sx={{ cursor: 'pointer' }} onClick={remove} />
            </ListItemButton>
          </ListItem>
        )}
      </Draggable>

      <RenameTodoModal
        open={openRename}
        onClose={() => setOpenRename(false)}
        todo={todo}
      />
    </>
  );
};

export default TodoItem;
