import { ListItem, ListItemButton, ListItemText } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { Draggable } from '@hello-pangea/dnd';

const TodoItem = ({ todo, index }) => {
  const remove = () => {};
  const rename = () => {};

  return (
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
  );
};

export default TodoItem;
