import styled from 'styled-components';
import { Droppable } from '@hello-pangea/dnd';

const Column = styled.div`
  width: 280px;
  background: #f4f5f7;
  border-radius: 6px;
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const LaneHeader = styled.h3`
  margin: 0;
  font-size: 18px;
  text-align: center;
`;

const LaneColumn = ({ lane, children }) => {
  if (!lane) {
    return null;
  }

  return (
    <Droppable droppableId={String(lane.id)}>
      {(prov) => (
        <Column ref={prov.innerRef} {...prov.droppableProps}>
          <LaneHeader>{lane.name}</LaneHeader>
          {children}
          {prov.placeholder}
        </Column>
      )}
    </Droppable>
  );
};

export default LaneColumn;
