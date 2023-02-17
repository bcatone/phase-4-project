import "../App.css";

import React, { useState, useEffect } from "react";

import CreatePostForm from "./CreatePostForm";

import Post from "./PostCard";

function PostContainer({ user, tags }) {
  const [posts, setPosts] = useState([]);
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Initial GET requests
  useEffect(() => {
    setIsLoading(true);
    fetch("/posts").then((resp) => {
      if (resp.ok) {
        resp.json().then((posts) => {
          setPosts(posts);
          setIsLoading(false);
        });
      } else {
        resp.json().then((json) => {
          setErrors([json.errors]);
          setIsLoading(false);
        });
        setPosts([]);
      }
    });
  }, []);

  const handleDeletePost = (deletedPost) => {
      const filteredPosts = posts.filter((post) => {
        return post !== deletedPost;
      });

      fetch(`/posts/${deletedPost.id}`, {method: "DELETE"})
    .then((resp) => {
      if (resp.ok) {
        setPosts(filteredPosts);
    } else {
        resp.json().then((json) => {
          setErrors([json.errors]);
        });
      }
    });
      setPosts(filteredPosts);


  };

  return (
      <div className="container">
        
        {posts.map((post) => (
          <Post
            key={post.id}
            post={post}
            user={user}
            handleDeletePost={handleDeletePost}
          />
        ))}
      </div>
    );

};

export default PostContainer;

  

  // const [tags, setTags] = useState([]);
  // const [tagSuggestions, setTagSuggestions] = useState([]);
  // const [errors, setErrors] = useState([]);
  // const [isLoading, setIsLoading] = useState(true);

  // // Initial GET requests
  // useEffect(() => {
  //   setIsLoading(true);
  //   fetch("/posts").then((resp) => {
  //     if (resp.ok) {
  //       resp.json().then((posts) => {
  //         setPosts(posts);
  //         setIsLoading(false);
  //       });
  //     } else {
  //       resp.json().then((json) => {
  //         setErrors([json.errors]);
  //         setIsLoading(false);
  //       });
  //       setPosts([]);
  //     }
  //   });
  // }, []);

  // useEffect(() => {
  //   fetch("/tags").then((resp) => {
  //     if (resp.ok) {
  //       resp.json().then((tags) => {
  //         setTags(tags);
  //         const suggestions = tags.map(tag => {
  //           return {id: tag.name, text: tag.name};
  //         });
  //         setTagSuggestions(suggestions)
  //       });
  //     } else {
  //       setTagSuggestions([]);
  //     }
  //   });
  // }, []);

  // const addNewPost = (post) => {
  //   setPosts([posts, ...posts]);
  // };

  // const handleDeletePost = (deletedPost) => {
  //   const filteredPosts = posts.filter((post) => {
  //     return post !== deletedPost;
  //   });
  //   setPosts(filteredPosts);

  //   fetch(`/posts/${deletedPost.id}`, {method: "DELETE"})
  //   .then((resp) => {
  //     if (!resp.ok) {
  //       resp.json().then((json) => {
  //         setErrors([json.errors]);
  //       });
  //     }
  //   });
  // };


  // return (
  //   <div>
  //     {posts.map((post) => (
  //       <Post
  //         key={post.id}
  //         post={post}
  //         user={user}
  //         handleDeletePost={handleDeletePost}
  //       />
  //     ))}
  //   </div>
  // );
// };

// export default PostContainer;
