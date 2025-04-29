import './index.css';
import './App.css';
import { ApolloProvider } from '@apollo/client';
import { client } from './api/graphql/client';
import BoardPage from './pages/BoardPage';

const App = () => {
  const app = (
    <ApolloProvider client={client}>
      <div className="App">
        <BoardPage />
      </div>
    </ApolloProvider>
  );

  return app;
};

export default App;
