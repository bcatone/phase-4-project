import React, { useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";

function UserNav({ user, updateUser }) {
  const [errors, setErrors] = useState([]);
  const history = useHistory();

  const handleLogOut = () => {
    fetch("/logout", {
      method: "DELETE",
    }).then((resp) => {
      if (resp.ok) {
        updateUser(null);
        history.push("/login");
      } else {
        resp.json().then(json => {
          setErrors([json.errors])
      });
      }
    });
  };

  return (
    <nav>
      <button><Link to="/posts">Posts</Link></button>
      <button><Link to="/user/:id/posts/new">Create New Post</Link></button>
      <button><Link to="/users/:id/settings">Settings</Link></button>
      <button onClick={handleLogOut}>Log Out</button>
    </nav>
  );
}

export default UserNav;
