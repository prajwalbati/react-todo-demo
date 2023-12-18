import React from 'react';
import { Routes, Route, Outlet, Link } from "react-router-dom";

import Todos from './components/todo/Todos';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import ActivateUser from './components/auth/ActivateUser';
import './App.css';

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

function Layout() {
  return (
    <div className="page-content page-container" id="page-content">
        <div className="padding">
            <div className="row container d-flex justify-content-center">
              <div className="col-md-12">
                  <h1 className="text-center">Todo Application</h1>
                  <Outlet />
                </div>
            </div>
        </div>
    </div>
  );
}

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