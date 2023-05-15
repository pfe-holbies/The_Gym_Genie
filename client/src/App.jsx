import React from 'react';
import { ApolloProvider } from '@apollo/client';
import client from './utils/apolloClient';
import { AuthProvider } from './utils/authContext';
import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home/Home';
import Register from './pages/Register/Register';
import Login from './pages/Login/Login';
import Dashboard from './pages/Dashboard/Dashboard';
import Plan from './pages/Plan/Plan';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <>
      {/* App wrapped into ApolloProvider */}
      <ApolloProvider client={client}>
        <AuthProvider>
          <div className="App-container">
            <Routes>
              {/* Pages */}
              <Route path="/" element={<Home />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/plan" element={<Plan />} />
            </Routes>
          </div>
        </AuthProvider>
      </ApolloProvider>
    </>
  );
}

export default App;
