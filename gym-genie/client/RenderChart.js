import React from 'react';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import PreviousWeekCalorieBurn from './PreviousWeekCalorieBurn';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <PreviousWeekCalorieBurn userId="USER_ID_HERE" />
      </div>
    </ApolloProvider>
  );
}

export default App;