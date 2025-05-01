import { Dialog, DialogTitle, DialogActions, Button } from '@mui/material';
import { useDeleteTodo } from '../hooks';
import { getOperationName } from '@apollo/client/utilities';
import { LANES_TODOS_QUERY } from '../../../api/graphql/queries';

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

    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Delete “{todo?.name}”?</DialogTitle>
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
