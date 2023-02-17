import React from "react";
import { Link, useHistory } from 'react-router-dom'


function ResetPassword({user}) {
    const [formData, setFormData] = useState({
        username: user.username,
        email: user.email
    });
    const history = useHistory();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({...formData, [name]: value})
    };

    const onSubmit = (e) => {
        e.preventDefault();

    };

    return (
        <form onSubmit={onSubmit}>
            {errors.map((error, i) => <p key={i}>{error}</p>)}
            <div className="form-group">
                <label>Username :</label>
                <input type="text" name="username" value={formData.username} onChange={handleChange} />
            </div>
            <div className="form-group">
                <label>Email: </label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} />
            </div>
            <input type="submit" value="Reset Password" />
        </form>
    )
};

export default ResetPassword;