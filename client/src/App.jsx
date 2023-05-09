import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import OpenAI from './pages/OpenAI';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Test from './pages/Test';
import Data from './pages/Data';
import Dashboard from './pages/Dashboard';
import Mutations from './pages/Mutations';
import { AuthProvider } from './context/auth';

// Instantiate Apollo Client
const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql',
  cache: new InMemoryCache(),
});

function App() {
  return (
    <>
      <AuthProvider>
        <ApolloProvider client={client}>
                <Router>
                  <div className="App container">
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/register" element={<Register />} />
                      <Route path="/login" element={<Login />} />
                      <Route path="/openai" element={<OpenAI />} />
                      <Route path="/test" element={<Test />} />
                      <Route path="/data" element={<Data />} />
                      <Route path="/dashboard" element={<Dashboard />} />
                      <Route path="/mutations" element={<Mutations />} />
                    </Routes>
                  </div>
                </Router>
              </ApolloProvider>
      </AuthProvider>
      
    </>
  );
}

export default App;
