import "../App.css"

import React, { useContext } from "react";

import Heading from "./Heading";
import NavBar from "./NavBar";

function Header({user, updateUser, handleLogOut}) {
    return (
        <div>
            <Heading user={user}/>
            <NavBar user={user} updateUser={updateUser} handleLogOut={handleLogOut}/>
        </div>
    );
};

export default Header;