import styled from 'styled-components';
import { DragDropContext } from '@hello-pangea/dnd';
import { LaneColumn } from '../../lanes';
import TodoItem from '../../todos/components/TodoItem';
import { useUpdateTodo } from '../../todos/hooks';
import { useLanesWithTodos } from '../hooks';

const Row = styled.div`
  display: flex;
  gap: 24px;
`;

const ScrollBox = styled.div`
  background: #efefef;
  padding: 12px;
  border-radius: 5px;
  max-height: 400px;
  overflow-y: auto;
`;

const Lanes = () => {
  const { data, loading, refetch } = useLanesWithTodos();
  const [updateTodo] = useUpdateTodo();

  if (loading) {
    return null;
  }

  const lanes = data?.lanesWithItem ?? [];
  const todos = lanes.flatMap((lane) => lane.todos);

  const onDragEnd = async (result) => {
    const { destination, draggableId } = result;
    if (!destination) {
      return;
    }

    const destLaneId = parseInt(destination.droppableId, 10);
    const todoId = parseInt(draggableId, 10);

    const todoData = todos.find((todoItem) => todoItem.id === todoId);
    const updatedTodo = { ...todoData, lane_id: destLaneId };
    delete updatedTodo.__typename;

    await updateTodo({
      variables: { values: updatedTodo },
      awaitRefetchQueries: true,
    });

    await refetch();
  };

  const columns = lanes.map((lane) => {
    const body = (
      <ScrollBox>
        {lane.todos.map((todo, idx) => (
          <TodoItem key={todo.id} todo={todo} index={idx} />
        ))}
      </ScrollBox>
    );

    return (
      <LaneColumn key={lane.id} lane={lane}>
        {body}
      </LaneColumn>
    );
  });

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Row>{columns}</Row>
    </DragDropContext>
  );
};

export default Lanes;
