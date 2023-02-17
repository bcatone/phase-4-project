import "../App.css";

import React, { useState } from "react";
import { useHistory } from "react-router-dom";

function Signup({ updateUser }) {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    password_confirmation: "",
    email: "",
  });
  const [errors, setErrors] = useState([]);
  const history = useHistory();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const user = {
      username: formData.username,
      password: formData.password,
      email: formData.email,
    };

    fetch(`/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    }).then((res) => {
      if (res.ok) {
        res.json().then((user) => {
          updateUser(user);
          history.push(`/users/${user.id}`);
        });
      } else {
        res.json().then((json) => setErrors(Object.entries(json.errors)));
      }
    });
  };

  return (
    <div className="container">
    <form onSubmit={onSubmit}>
      {errors.map((error, i) => <p key={i}>{error}</p>)}
      <div className="form-group">
        <label>Username: </label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Password: </label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Confirm password: </label>
        <input
          type="password"
          name="password_confirmation"
          value={formData.password_confirmation}
          onChange={handleChange}
          required
        />
      </div>
      <p>
      {formData.password_confirmation &&
      formData.password !== formData.password_confirmation ? "Passwords do not match" : null}
      </p>

      <input type="submit" value="Sign Up" />
    </form>
    </div>
  );

}

export default Signup;
