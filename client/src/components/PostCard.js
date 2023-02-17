import "../App.css";
import React, { useState } from "react";
import { Link, Redirect, useHistory } from 'react-router-dom'

function PostCard({post, user, handleDeletePost}) {
    const onDelete = () => {
        handleDeletePost(post);
    };

    return (
        <div className="post-card">
            {user ? (
                <>
                <h3 className="page-title">{post.title}</h3>
                <p>{post.username} </p>
                <p>
                    {post.username === user.username ? (
                    <>
                    {/* <span><Link to="user/:id/posts/:id/edit">Edit </Link></span> */}
                    <span onClick={onDelete} value={post.id}> Delete </span>
                    </>
                    ) : null }
                </p>
                
                {post.tags.map((tag,i) => (<span key={tag.id}>{tag.name}  </span>))}
                <p>{post.content.substring(0,300)}</p>
                </>
            ) : null}
            
        </div>
    );
};

export default PostCard;