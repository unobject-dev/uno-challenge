import {
	ApolloClient,
	ApolloProvider,
	createHttpLink,
	InMemoryCache,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { RouterProvider } from "react-router-dom";
import "./App.css";
import { DefaultContextProvider, DefaultContext } from "./context/ctx";
import DialogWrapper from "./util/dialog-wrapper";
import router from "./routes/routes";
import { useContext } from "react";

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

// Um componente pra permitir useContext fique dentro do provider
function AppContent() {
	const { ctxData } = useContext(DefaultContext);

	return (
		<>
			<div className="App">
				<RouterProvider router={router} />
			</div>
			{ctxData.dialog && <DialogWrapper />}
		</>
	);
}

function App() {
	return (
		<DefaultContextProvider>
			<ApolloProvider client={client}>
				<AppContent />
			</ApolloProvider>
		</DefaultContextProvider>
	);
}

export default App;
