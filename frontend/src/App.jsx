import './index.css';
import './App.css';
import { ApolloProvider } from '@apollo/client';
import { client } from './api/graphql/client';
import BoardPage from './pages/BoardPage';
import ToastProvider from './ToastProvider';

const App = () => (
  <ApolloProvider client={client}>
    <div className="App">
      <BoardPage />
      <ToastProvider />
    </div>
  </ApolloProvider>
);

export default App;
