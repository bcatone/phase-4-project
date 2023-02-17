import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";

function DefaultNav() {
    return (
        <nav className="nav-bar">
            <Link to="/login">Log In</Link>
            <Link to="/signup">Sign Up</Link>
        </nav>
    );
};

export default DefaultNav;