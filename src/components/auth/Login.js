import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";

import sendRequest from '../../utils/fetchRequest';
import Errors from '../Errors';
import ProfileContext from '../../contexts/ProfileContext';

const Login = () => {
    const navigate = useNavigate();
    const {profile, setProfile} = useContext(ProfileContext);
    const [credentials, setCredentials] = useState({
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState([]);
    const [loading, setLoading] = useState(false);

    const onChangeHandler = (e) => {
        let updatedUser = { ...credentials, [e.target.name]: e.target.value };
        setCredentials(updatedUser);
    };

    const loginUser = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            let response = await sendRequest('/api/auth/login', 'POST', false, JSON.stringify(credentials));
            let resJson = await response.json();
            setErrors([]);
            if (!response.ok) {
                if (response.status === 422) {
                    setErrors(resJson);
                }
                if (response.status === 400) {
                    setErrors([{msg: resJson.error}]);
                }
                setLoading(false);
            } else {
                setLoading(false);
                setProfile({ email: credentials.email });

                let session = resJson.data;
                window.localStorage.setItem('accesstoken', session.access_token);
                window.localStorage.setItem('refreshtoken', session.refresh_token);
                window.localStorage.setItem('expiresin', session.expires_in);
            }
        } catch (error) {
            console.error(error);
            setErrors([{ msg: 'SomeThing went wrong.' }]);
            setLoading(false);
        }
    };

    useEffect(() => {
        if (profile && profile.email) {
            navigate('/');
        }
    }, [profile, navigate])

    return (
        <div className="card-body">
            <h4 className="card-title">Login</h4>
            <form onSubmit={loginUser}>
                <Errors errors={errors}></Errors>
                <div className="row form-group">
                    <label className="col-sm-4 control-label">Email *</label>
                    <div className="col-sm-8">
                        <input name="email" value={credentials.email} onChange={onChangeHandler} type="email" className="form-control" placeholder='Email Address' required />
                    </div>
                </div>
                <div className="row form-group">
                    <label className="col-sm-4 control-label">Password *</label>
                    <div className="col-sm-8">
                        <input name="password" value={credentials.password} onChange={onChangeHandler} type="password" className="form-control" placeholder='Password' required />
                    </div>
                </div>

                <div className="row form-group">
                    <div className="col-sm-8 offset-sm-4">
                        <button type="submit" className="btn btn-primary" disabled={loading?true:false}>{ loading ? 'Logging In' : 'Login' }</button>
                        <span> OR </span>
                        <Link to="/register">Create an Account</Link>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default Login;