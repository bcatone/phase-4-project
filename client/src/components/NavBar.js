import React, { useContext } from "react";
import { Link, useHistory } from 'react-router-dom';

import DefaultNav from "./DefaultNav";
import UserNav from "./UserNav";

function NavBar({user, updateUser, handleLogOut}) {

  return (
    <>
      {user ? (<UserNav user={user} updateUser={updateUser} handleLogOut={handleLogOut}/>) : <DefaultNav />}
    </>
  )
    // const history = useHistory();

    // const handleLogOut = () => {
    //     fetch("/logout", {
    //       method:'DELETE'
    //     })
    //     .then(resp =>{
    //       if(resp.ok){
    //         updateUser(null)
    //         history.push("/login")
    //       }
    //     })
    //   }

    // return (
    //     <div className="nav-bar">
    //         <nav>
    //             {user ? (
    //                 <>
    //                 <Link to="/users/:id">Home</Link>
    //                 <Link to="/posts">Posts</Link>
    //                 <Link to="/users/:id/settings">Settings</Link>
    //                 <button onClick={handleLogOut}>Log Out</button>
    //                 </>
    //             ) : (
    //                 <>
    //                 <Link to="/login">Log In</Link>
    //                 <Link to="/signup">Sign Up</Link>
    //                 </>
    //             )}
    //         </nav>
            
    //     </ div>
    // )

};

export default NavBar