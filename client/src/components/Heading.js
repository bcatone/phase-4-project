import React from "react";

function Heading({user}) {
    return (
        <div>
            <h1>{user ? (`Hello, ${user.username}!`) : ("Title")}</h1>
        </div>
    );
};

export default Heading