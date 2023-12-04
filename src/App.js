import React from 'react';
import { Routes, Route, Outlet, Link } from "react-router-dom";

import Todo from './components/Todo';
import Register from './components/Register';
import Login from './components/Login';
import './App.css';

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Todo />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
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