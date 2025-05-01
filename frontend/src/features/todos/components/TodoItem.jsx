import { useState } from 'react';
import { ListItem, ListItemButton, ListItemText } from '@mui/material';
import { Edit, Delete as DeleteIcon } from '@mui/icons-material';
import { Draggable } from '@hello-pangea/dnd';
import RenameTodoModal from './RenameTodoModal';
import DeleteTodoModal from './DeleteTodoModal';

const TodoItem = ({ todo, index, done }) => {
  const [openRename, setOpenRename] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const rename = () => setOpenRename(true);
  const remove = () => setOpenDelete(true);

  return (
    <>
      <Draggable draggableId={String(todo.id)} index={index}>
        {(prov) => (
          <ListItem
            ref={prov.innerRef}
            {...prov.draggableProps}
            {...prov.dragHandleProps}
            disablePadding
            sx={{ mb: 1, borderRadius: 1, background: '#fff', opacity: done ? 0.6 : 1 }}
          >
            <ListItemButton dense>
              <ListItemText
                primaryTypographyProps={{
                  style: {
                    textDecoration: done ? 'line-through' : 'none',
                    color: done ? 'gray' : undefined,
                  },
                }}
                primary={todo.name}
              />
              <Edit
                sx={{ cursor: 'pointer', mr: 1, color: done ? 'gray' : 'inherit' }}
                onClick={rename}
              />
              <DeleteIcon
                sx={{ cursor: 'pointer', color: done ? 'gray' : 'inherit' }}
                onClick={remove}
              />
            </ListItemButton>
          </ListItem>
        )}
      </Draggable>

      <RenameTodoModal
        open={openRename}
        onClose={() => setOpenRename(false)}
        todo={todo}
      />
      <DeleteTodoModal
        open={openDelete}
        onClose={() => setOpenDelete(false)}
        todo={todo}
      />
    </>
  );
};

export default TodoItem;
