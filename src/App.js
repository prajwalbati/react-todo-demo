import React, { useContext, useEffect } from 'react';
import { Routes, Route, Outlet, Link, useNavigate } from "react-router-dom";

import Todos from './components/todo/Todos';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import ActivateUser from './components/auth/ActivateUser';
import './App.css';
import ProfileContext from './contexts/ProfileContext';

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
  const navigate = useNavigate();

  const { profile, setProfile } = useContext(ProfileContext);

  const logout = () => {
    setProfile(null);
    window.localStorage.removeItem('accesstoken');
    window.localStorage.removeItem('refreshtoken');
    window.localStorage.removeItem('expiresin');
  };

  useEffect(() => {
    if (!profile) {
      navigate('/login');
    }
  }, [profile, navigate]);

  return (
    <div className="page-content page-container" id="page-content">
      <div className="padding">
          {profile && profile.email &&
            <button className="btn btn-default pull-right" onClick={logout}>
              Log out <i className="logout mdi mdi-logout" aria-hidden="true"></i>
            </button>
          }
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