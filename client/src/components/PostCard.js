import "../App.css";

import React, { useState } from "react";

function PostCard({post, user, handleDeletePost}) {
    const onDelete = () => {
        handleDeletePost(post);
    };

    return (
        <div className="post-card">
            {user ? (
                <>
                <h3 className="page-title">{post.title}</h3>
                <p>
                    {post.username}
                    {post.username === user.username ? (<i onClick={onDelete} value={post.id}>x</i>) : null}
                </p>
                {post.tags.map((tag,i) => (<span key={tag.id}>{tag.name}  </span>))}
                <p>{post.content.substring(0,300)}</p>
                </>
            ) : null}
            
        </div>
    );
};

export default PostCard;