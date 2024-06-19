import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import store from "../../../features/store";

const httpLink = createHttpLink({
	uri: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT,
});

const authLink = setContext((_, { headers }) => {
	//use a different token as cyber accessToken is not in auth property
	const token = store.getState().auth.accessToken; // use the valid token if access token is not the desired token

	return {
		headers: {
			...headers,
			Authorization: token ? `bearer ${token}` : "",
			"X-API-KEY": process.env.NEXT_PUBLIC_CYBERCONNECT_API_KEY,
		},
	};
});

export const apolloClient = new ApolloClient({
	link: authLink.concat(httpLink),
	cache: new InMemoryCache(),
});
