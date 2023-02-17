import "../App.css";

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function UserHomePage({user, updateUser}) {
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState([]);

  const params = useParams();

    return (
        <div className="container">
          {user ? `Hi, ${user.username}!` : null }
        </div>
    );
};

export default UserHomePage;