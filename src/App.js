import React from 'react';
import { Routes, Route, Link } from "react-router-dom";

import Todos from './components/todo/Todos';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import ActivateUser from './components/auth/ActivateUser';
import './App.css';
import Layout from './components/layout';

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Todos />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="activate" element={<ActivateUser />} />
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;


function NoMatch() {
  return (
    <div>
      <h2>Nothing to see here!</h2>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </div>
  );
}