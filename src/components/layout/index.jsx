import React, { useEffect, useContext } from "react";
import { useNavigate, useLocation, Outlet } from "react-router-dom";

import ProfileContext from "../../contexts/ProfileContext";

const Layout = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const pathname = location.pathname;

    const { profile, setProfile } = useContext(ProfileContext);

    const logout = () => {
        window.localStorage.removeItem('accesstoken');
        window.localStorage.removeItem('refreshtoken');
        window.localStorage.removeItem('expiresin');
        setProfile(null);
    };

    useEffect(() => {
        if (!profile && pathname === "/") {
            navigate('/login');
        }
    }, [profile, navigate, pathname]);

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
};

export default Layout;