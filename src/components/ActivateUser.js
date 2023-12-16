import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";

const ActivateUser = () => {
    const navigate = useNavigate();
    const [token, setToken] = useState('');
    const [errors, setErrors] = useState([]);
    const [loading, setLoading] = useState(false);

    const getErrorsList = () => {
        if (errors && errors.length > 0) {
            let errorElem = errors.map((err, index) => {
                return <div className="row" key={index}>
                    <div className="col-sm-12">
                        <div className="alert alert-danger text-center" role="alert">
                            {err.msg}
                        </div>
                    </div>
                </div>
            });
            return errorElem;
        }
        return null;
    }

    const activateUser = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            let response = await fetch(`https://express-todo-mway.onrender.com/api/auth/${token}/activate`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                }
            });
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
                {getErrorsList()}
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