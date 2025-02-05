import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
    uri: `${import.meta.env.VITE_API_BASE_URL}/graphql`,
    cache: new InMemoryCache({
        addTypename: false,
    }),
});

export default client;
