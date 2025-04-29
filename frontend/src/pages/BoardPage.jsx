import { TodoList } from '../features/todos';

const BoardPage = () => {
  const page = (
    <div className="App-header">
      <TodoList />
    </div>
  );

  return page;
};

export default BoardPage;
