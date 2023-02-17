import "../App.css";

import React, { useState } from "react";
import UserChangePasswordForm from "./UserChangePasswordForm";

import UserDeleteAccountForm from "./UserDeleteAccountForm";
import UserInfoForm from "../UserInfoForm";

function UserSettings({user, updateUser, handleLogOut}) {

    const [formData, setFormData] = useState([]);
    const [errors, setErrors] = useState([]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({...formData, [name]: value})
    };

    return (
        <div className="container">
            <UserInfoForm user={user} updateUser={updateUser} />
            <UserChangePasswordForm user={user} updateUser={updateUser} />
            <UserDeleteAccountForm user={user} updateUser={updateUser} handleLogOut={handleLogOut} />
        </div>
        // <form>
        //     <div className="form-group">

        //     <label>Username: </label>
        //     <input type="text" name="username" value={formData.username} onChange={handleChange}/>
        //     </div>
        //     <div className="form-group">
        //     <label>Current password: </label>
        //     <input type="password" name="password" value={formData.password} onChange={handleChange}/>
        //     </div>
        //     <div className="form-group">
        //     <label>New Password: </label>
        //     <input type="password" name="new_password" value={formData.new_password} onChange={handleChange}/>
        //     </div>
        //     <div>
        //     <label>Confirm new password: </label>
        //     <input type="password" name="new_password_confirmation" value={formData.new_password} onChange={handleChange}/>
        //     </div>
        //     <input type="submit" value="Update Profile" />
        // </form>
    );
};

export default UserSettings;