import { useState } from 'react';
import { TextField, Button } from '@mui/material';
import { useAddTodo } from '../hooks';

const TodoForm = () => {
  const [taskName, setTaskName] = useState('');
  const [addTodo] = useAddTodo();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!taskName.trim()) {
      return;
    }

    await addTodo({
      variables: { values: { name: taskName.trim() } },
    });

    setTaskName('');
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', gap: 16 }}>
      <TextField
        label="New task"
        variant="standard"
        value={taskName}
        onChange={(e) => {
          setTaskName(e.target.value);
        }}
      />
      <Button type="submit" variant="contained" color="success">
        Save
      </Button>
    </form>
  );
};

export default TodoForm;
