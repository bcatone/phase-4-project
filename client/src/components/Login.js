import "../App.css";

import React, { useState } from "react";
import { Link, Redirect, useHistory } from 'react-router-dom'

import Loading from "./Loading";

function Login({ user, updateUser }) {
    const [formData, setFormData] = useState({
        username: "",
        password: ""
    });
    const [errors, setErrors] = useState([]);
    const [isLoading, setIsLoading] = useState(false)
    const history = useHistory();

    if (user) return <Redirect to="/posts" />

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({...formData, [name]: value})
    };

    const onSubmit = (e) => {
        e.preventDefault();

        setIsLoading(true);

        const user = {
            username: formData.username,
            password: formData.password
        }

        fetch('/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(user)
        })
        .then(resp => {
            if (resp.ok) {
                resp.json().then( user => {
                    updateUser(user);
                    setIsLoading(false);
                    history.push(`/users/${user.id}`)
                })
            }
            else {
                resp.json().then(json => {
                    setErrors([json.errors]);
                    setIsLoading(false);
                })
            }
        })

    };

    if (isLoading) {
        return (<Loading />);
    }
    return (
        <div className="container">
        <form onSubmit={onSubmit}>
        {errors.map((error, i) => <p className="error" key={i}>{error}</p>)}
            <div className="form-group">
            <label>Username: </label>
            <input type="text" name="username" value={formData.name} onChange={handleChange} />
            </div>
            <div className="form-group">
            <label>Password: </label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} />
            </div>
            <input type="submit" value="Log in" />
        </form>
        {/* <Link to="users/reset_password">Forgot Password?</Link> */}
        </div>
    );
};

export default Login;