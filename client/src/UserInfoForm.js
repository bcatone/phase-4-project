import React, { useState } from "react";

function UserInfoForm({user, updateUser}) {
    const [formData, setFormData] = useState({
        first_name: ""
    });
    const [errors, setErrors] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
      };

    const handleSubmit = (e) => {
        e.preventDefault();
    
        fetch(`/users/${user.id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
          }).then((resp) => {
            if (resp.ok) {
              resp.json().then((user) => {
                updateUser(user);
              });
            } else {
              resp.json().then((json) => setErrors([json.errors]));
            }
          });
        };

    return (
        <div className="container">
            {errors.map(error => <p className="error">{error}</p>)}
            <form onSubmit={handleSubmit}>
                <h4>User Information</h4>
                <div className="form-group">
                    <label>First Name:</label>
                    <input type="text" name="first_name" value={formData.value} onChange={handleChange} />
                </div>
                <input type="submit" value="Submit" />
            </form>
        </div>
    )
};

export default UserInfoForm;