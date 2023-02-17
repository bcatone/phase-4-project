import "../App.css";

import React, { useState, useEffect, useInsertionEffect } from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { WithContext as ReactTags } from "react-tag-input";

import Loading from "./Loading";

function CreatePostForm({ user, tags, updateTags, handleAddPost }) {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTags, setSelectedTags] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleContentChange = (e) => {
    //console.log(e)
    setFormData({ ...formData, content: e.blocks[0].text });
  };

  const handleAddTag = (newTag) => {
    if (tags.filter((tag) => tag.text === newTag.text).length === 0) {
      handleAddNewTag(newTag);
    }
    setSelectedTags([...selectedTags, newTag]);
  };

  const handleRemoveTag = (i) => {
    const filteredTags = selectedTags.filter((tag, index) => index !== i);
    setSelectedTags(filteredTags);
  };

  const handleAddNewTag = (tag) => {
    const newTag = {
      name: tag.text,
    };

    setIsLoading(true);

    fetch("/tags", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTag),
    }).then((resp) => {
      if (resp.ok) {
        resp.json().then((addedTag) => {
          updateTags(addedTag);
          setIsLoading(false);
        });
      } else {
        resp.json().then((json) => {
          setErrors([json.errors]);
          setIsLoading(false);
        });
      }
    });
  };

  const handleSubmitPostTags = (postId, tags) => {

    setIsLoading(true);

    const postTagData = {
      post_id: postId,
      submitted_tags: tags
    };

    fetch("/post_tags", {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(postTagData)
    })
    .then(resp => {
      if (resp.ok) {
        setIsLoading(false);
      } else {
        resp.json().then((json) => {
          console.log(json.errors);
          setErrors([...errors, json.errors]);
          setIsLoading(false);
        });
      }
    })
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setIsLoading(true);

    const post = {
      title: formData.title,
      content: formData.content,
      user_id: user.id
    };

    fetch("/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(post)
    }).then(resp => {
      if (resp.ok) {
        resp.json().then(addedPost => {
          const newTags = selectedTags.map(selectedTag => selectedTag.text);
          handleSubmitPostTags(addedPost.id, newTags);
        });
      } else {
        resp.json().then(json => {
          setErrors([json.errors]);
          setIsLoading(false);
        }
          );
      };
    });
  };

  if (isLoading) {
    return (<Loading />)
  }
  return (
    <div className="container">
      <h3 className="page-title">Create a New Post</h3>
      {errors.map((error, i) => <p className="error" key={i}>{error}</p>)}
      <ReactTags
        tags={selectedTags}
        suggestions={tags}
        delimiters={[13]}
        handleAddition={handleAddTag}
        handleDelete={handleRemoveTag}
      />

      <form onSubmit={handleSubmit}>
       <div className="form-group">
         <label>Title: </label>
         <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
        />
      </div>

      <Editor
        onChange={handleContentChange}
        toolbarClassName="toolbarClassName"
        wrapperClassName="wrapperClassName"
        editorClassName="editorClassName"
        wrapperStyle={{ width: 800, border: "1px solid black", "backgroundColor": "#222" }}
        toolbarStyle={{"backgroundColor": "#333333", color: "#000000"}}
        spellCheck="true"
        stripPastedStyles="false"
      />


      {/* <textarea name="content" value={formData.content} onChange={handleChange} /> */}
      <input type="submit" value="Submit" />
    </form>
    </div>
  );
}

export default CreatePostForm;

// import React, { useState, useEffect, useInsertionEffect } from "react";
// import { Editor } from "react-draft-wysiwyg";
// import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
// import { WithContext as ReactTags } from "react-tag-input";

// function CreatePostForm({ user, tags, updateTags, handleAddPost }) {
//   const [formData, setFormData] = useState({
//     title: "",
//     content: "",
//   });
//   const [errors, setErrors] = useState([]);
//   const [selectedTags, setSelectedTags] = useState([]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleContentChange = (e) => {
//     //console.log(e)
//     setFormData({ ...formData, content: e.blocks[0].text });
//   };

//   const handleAddTag = (newTag) => {

//     // if (tags.filter(tag => tag.tag.name === newTag.text).length === 0) {
//     //   handleNewTagSubmission(newTag);
//     // }
//     setSelectedTags([...selectedTags, newTag])
//   };

//   const handleRemoveTag = (i) => {
//     const filteredTags = selectedTags.filter((tag, index) => index !== i);
//     setSelectedTags(filteredTags);
//   };

//   // const handleNewTagSubmission = (newTag) => {

//   //   fetch("/tags", {
//   //          method: "POST",
//   //          headers: { "Content-Type": "application/json" },
//   //          body: JSON.stringify(addTag),
//   //        }).then((resp) => {
//   //          if (resp.ok) {
//   //            resp.json().then((addedTag) => {
//   //              updateTags(addedTag)
//   //            });
//   //          } else {
//   //            resp.json().then((json) => {
//   //              setErrors([json.errors]);
//   //            });
//   //          }
//   //        });
//   // };

//   const onSubmit = (e) => {
//     e.preventDefault();

//     const post = {
//       title: formData.title,
//       content: formData.content,
//       user: user,
//       submitted_tags: selectedTags.map(tag => tag.text)
//     };

//     fetch("/posts", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(post),
//     }).then((resp) => {
//       if (resp.ok) {
//         resp.json().then((post) => {
//           console.log(post);
//         });
//       } else {
//         resp.json().then((json) => {
//           setErrors([json.errors]);
//         });
//       }
//     });
//   };

//   return (
//     <div>

//     <ReactTags
//       tags={selectedTags}
//       suggestions={tags}
//       delimiters={[13]}
//       handleAddition={handleAddTag}
//       handleDelete={handleRemoveTag}
//     />

//     <form onSubmit={onSubmit}>
//       <div className="form-group">
//         <label>Title: </label>
//         <input
//           type="text"
//           name="title"
//           value={formData.title}
//           onChange={handleChange}
//         />
//       </div>

//       <Editor
//         onChange={handleContentChange}
//         toolbarClassName="toolbarClassName"
//         wrapperClassName="wrapperClassName"
//         editorClassName="editorClassName"
//         wrapperStyle={{ width: 800, border: "1px solid black", "backgroundColor": "#222" }}
//         toolbarStyle={{"backgroundColor": "#333333", color: "#000000"}}
//         spellCheck="true"
//         stripPastedStyles="false"
//       />
//       {/* <textarea name="content" value={formData.content} onChange={handleChange} /> */}
//       <input type="submit" value="Submit" />
//     </form>
//     </div>
//   );
// }

// export default CreatePostForm;
