import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";

import sendRequest from '../utils/fetchRequest';
import Errors from './Errors';

const ActivateUser = () => {
    const navigate = useNavigate();
    const [token, setToken] = useState('');
    const [errors, setErrors] = useState([]);
    const [loading, setLoading] = useState(false);

    const activateUser = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            let response = await sendRequest(`/api/auth/${token}/activate`, 'POST', false);
            let resJson = await response.json();
            setErrors([]);
            setLoading(false);
            if (!response.ok) {
                if (response.status === 422) {
                    setErrors(resJson);
                } else {
                    setErrors([{ msg: resJson.error }]);
                }
            } else {
                navigate("/login");
            }
        } catch (error) {
            console.error(error);
            setErrors([ {msg: 'SomeThing went wrong.'} ]);
            setLoading(false);
        }
    };

    return (
        <div className="card-body">
            <h4 className="card-title">Activate User</h4>
            <form onSubmit={activateUser}>
                <div className="alert alert-success text-center" role="alert">
                    User created successsfully. Please check your email for token to verify your account.
                </div>
                <Errors errors={errors} />
                <div className="row form-group">
                    <label className="col-sm-4 control-label">Token *</label>
                    <div className="col-sm-8">
                        <input name="token" type="text" className="form-control" placeholder='Token' value={token} onChange={(e) => setToken(e.target.value)} required />
                    </div>
                </div>

                <div className="row form-group">
                    <div className="col-sm-8 offset-sm-4">
                        <button type="submit" className="btn btn-primary" disabled={loading?true:false}>{ loading ? 'Activating User' : 'Activate User' }</button>
                        <span> OR </span>
                        <Link to="/login">Login</Link>
                    </div>
                </div>
            </form>
        </div>
    );

};

export default ActivateUser;