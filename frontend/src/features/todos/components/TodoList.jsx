import { useState } from 'react';
import {
  TextField,
  Button,
} from '@mui/material';
import styled from 'styled-components';
import { useAddTodo } from '../hooks';
import { Lanes } from '../../lanes';
import { getOperationName } from '@apollo/client/utilities';
import { TODOS_QUERY } from '../../../api/graphql/queries';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Card = styled.div`
  width: 900px;
  background: #dcdcdc;
  padding: 24px 32px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const Row = styled.div`
  display: flex;
  gap: 16px;
`;

const Toolbar = ({ onApply }) => {
  const [text, setText] = useState('');

  const apply = () => {
    onApply(text.trim());
  };

  return (
    <Row>
      <TextField
        label="Filter"
        variant="standard"
        value={text}
        onChange={(e) => {
          setText(e.target.value);
        }}
        sx={{ flex: 1 }}
      />
      <Button
        variant="contained"
        color="info"
        sx={{ minWidth: 100 }}
        onClick={apply}
      >
        Apply
      </Button>
    </Row>
  );
};

const TodoForm = ({ onSave }) => {
  const [name, setName] = useState('');

  const save = (e) => {
    e.preventDefault();
    onSave(name.trim());
    setName('');
  };

  return (
    <form onSubmit={save}>
      <Row>
        <TextField
          label="New task"
          variant="standard"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
          sx={{ flex: 1 }}
        />
        <Button
          type="submit"
          variant="contained"
          color="success"
          sx={{ minWidth: 100 }}
        >
          Save
        </Button>
      </Row>
    </form>
  );
};


const TodoList = () => {
  const [addTodo] = useAddTodo();

  const saveTodo = async (name) => {
    if (!name) {
      return;
    }

    await addTodo({
      variables: { values: { name } },
      awaitRefetchQueries: true,
      refetchQueries: [getOperationName(TODOS_QUERY)], //TODO: testar para ver se é desncessário.
    });
  };

  const applyFilter = (text) => {
    const filter = text ? { name: text } : null;
    refetch({ filter });
  };

  return (
    <Wrapper>
      <Card>
        <h2 style={{ margin: 0, textAlign: 'center' }}>TODO LIST</h2>
        <Toolbar onApply={applyFilter} />
        <TodoForm onSave={saveTodo} />
        <Lanes />
      </Card>
    </Wrapper>
  );
};

export default TodoList;
