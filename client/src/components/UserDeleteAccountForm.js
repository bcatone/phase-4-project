import "../App.css";

import React, { useState } from "react";
import { useHistory } from "react-router-dom";

function UserDeleteAccountForm({user, updateUser}) {
    const [formData, setFormData] = useState({
        password: "",
    });
    const [errors, setErrors] = useState([]);
    const history = useHistory();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({...formData, [name]: value})
    };

    const handleDeleteAccount = (e) => {
      e.preventDefault();

      const password = {
        password: formData.password
      }
      fetch(`/users/${user.id}`, {
        method: "DELETE",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(password)})
      .then(resp => {
        if (resp.ok) {
          handleLogOut();
        } else {
          resp.json().then(json => {
            setErrors([json.errors])
        })
        }
      })
    };

    const handleLogOut = () => {
        fetch("/logout", {method: "DELETE"})
        .then((resp) => {
          if (resp.ok) {
            updateUser(null);
            history.push("/");
          } else {
            resp.json().then(json => {
              setErrors([json.errors])
          });
          }
        });
      };

        

    return (
      <div className="container">
        <h4>Delete Account</h4>
        {errors.map((error, i) => <p key={i}>{error}</p>)}
        <form onSubmit={handleDeleteAccount}>
            <label>Password: </label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} required />
            <input type="submit" value="Delete Account" />
            {errors ? errors.map((error, i) => <p key={i}>{error}</p>) : null}
        </form>
        </div>
      )
};

export default UserDeleteAccountForm;