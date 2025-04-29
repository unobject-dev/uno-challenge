import styled from 'styled-components';
import { DragDropContext } from '@hello-pangea/dnd';
import { useLanes, LaneColumn } from '../../lanes';
import TodoItem from '../../todos/components/TodoItem';
import { useUpdateTodo } from '../../todos/hooks';

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

const Lanes = ({ todos }) => {
  const { data, loading } = useLanes();
  const [updateTodo] = useUpdateTodo();

  if (loading) {
    return null;
  }

  const lanes = data?.lanes ?? [];
  const backlog = lanes.find((l) => l.position === 0) ?? null;

  const grouped = {};
  lanes.forEach((l) => {
    grouped[l.id] = [];
  });

  todos.forEach((t) => {
    const laneId = grouped[t.lane_id] ? t.lane_id : backlog?.id;
    if (laneId) {
      grouped[laneId].push(t);
    }
  });

  const onDragEnd = async (result) => {
    const { destination, draggableId } = result;

    if (!destination) {
      return;
    }

    const destLaneId = parseInt(destination.droppableId, 10);
    const todoId = parseInt(draggableId, 10);
    console.log('vai atualizar');
    const resulyt = await updateTodo({
      variables: { values: { id: todoId, lane_id: destLaneId } },
      awaitRefetchQueries: true,
    }).catch(err => err);

    console.log(resulyt, 'result');
  };

  const columns = lanes
    .slice()
    .sort((a, b) => a.position - b.position)
    .map((lane) => {
      const list = grouped[lane.id] ?? [];

      const body = (
        <ScrollBox>
          {list.map((todo, idx) => (
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
