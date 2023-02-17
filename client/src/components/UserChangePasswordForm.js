import "../App.css";

import React, { useState } from "react";

function UserChangePasswordForm({ user, updateUser }) {
  const [formData, setFormData] = useState({
    current_password: "",
    new_password: "",
    new_password_confirmation: "",
  });
  const [errors, setErrors] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (formData.password_confirmation && formData.password !== formData.password_confirmation) {
        setErrors([...errors, "Passwords do not match"]);
    }
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmitPasswordChange = (e) => {
    e.preventDefault();
    
    const passwordInfo = {
        current_password: "",
        new_password: "",
    }

    fetch(`/users`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      }).then((res) => {
        if (res.ok) {
          res.json().then((user) => {
            updateUser(user);
          });
        } else {
          res.json().then((json) => setErrors([json.errors]));
        }
      });

  }

  return (
    <div className="container">
        <h4>Change Password</h4>
        {errors.map((error, i) => <p key={i}>{error}</p>)}
    <form onSubmit={handleSubmitPasswordChange}>
      <div className="form-group">
        <label>Current Password: </label>
        <input
          type="password"
          name="current_password"
          value={formData.current_password}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>New password: </label>
        <input
          type="password"
          name="new_password"
          value={formData.new_password}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Confirm new password:</label>
        <input
          type="password"
          name="new_password_confirmation"
          value={formData.new_password_confirmation}
          onChange={handleChange}
          required
        />
      </div>
      <input type="submit" value="Change Password" />
    </form>
    </div>
  );
}

export default UserChangePasswordForm;
