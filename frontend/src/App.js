import {
	ApolloClient,
	ApolloProvider,
	createHttpLink,
	InMemoryCache,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import "./App.css";
import List from "./list/list";
import { DialogContextProvider } from "./dialog/dialog-ctx";


const httpLink = createHttpLink({
	uri: process.env.REACT_APP_GRAPHQL_URI,
});

const authLink = setContext((_, { headers }) => {
	return {
		headers: {
			...headers,
		},
	};
});

const client = new ApolloClient({
	link: authLink.concat(httpLink),
	cache: new InMemoryCache(),
});



function App() {

	return (
		<DialogContextProvider>
			<ApolloProvider client={client}>
				<div className="App">
					<header className="App-header">
						<List />
					</header>
				</div>
			</ApolloProvider>
		</DialogContextProvider>
	);
}

export default App;
