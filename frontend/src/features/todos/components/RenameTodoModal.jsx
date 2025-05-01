import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from '@mui/material';
import { useUpdateTodo } from '../hooks';
import { toast } from 'react-toastify/dist/index.js';
import { getOperationName } from '@apollo/client/utilities';
import { LANES_TODOS_QUERY } from '../../../api/graphql/queries';

const RenameTodoModal = ({ open, onClose, todo }) => {
  const [updateTodo] = useUpdateTodo();
  const [name, setName] = useState('');

  useEffect(() => {
    setName(todo?.name ?? '');
  }, [todo]);

  const handleSave = async () => {
    const newName = name.trim();
    if (!todo || !newName || newName === todo.name) {
      onClose();
      return;
    }

    const updatedTodo = { ...todo, name: newName };
    delete updatedTodo.__typename;

    await updateTodo({
      variables: { values: updatedTodo },
      awaitRefetchQueries: true,
      refetchQueries: [getOperationName(LANES_TODOS_QUERY)],
    });

    toast.success('Task renamed');
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Rename task</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSave}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RenameTodoModal;
