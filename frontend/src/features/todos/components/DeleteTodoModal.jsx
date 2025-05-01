import { Dialog, DialogTitle, DialogActions, Button } from '@mui/material';
import { useDeleteTodo } from '../hooks';
import { getOperationName } from '@apollo/client/utilities';
import { LANES_TODOS_QUERY } from '../../../api/graphql/queries';
import { toast } from 'react-toastify/dist/index.js';

const DeleteTodoModal = ({ open, onClose, todo }) => {
  const [deleteTodo] = useDeleteTodo();

  const handleDelete = async () => {
    if (!todo) {
      onClose();
      return;
    }

    await deleteTodo({
      variables: { id: todo.id },
      awaitRefetchQueries: true,
      refetchQueries: [getOperationName(LANES_TODOS_QUERY)],
    });

    toast.success('Task Deleted');
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        Delete <strong>{todo?.name}</strong>?
      </DialogTitle>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" color="error" onClick={handleDelete}>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteTodoModal;
