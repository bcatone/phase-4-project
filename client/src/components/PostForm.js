import "../App.css";

import React, { useState, useEffect } from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { WithContext as ReactTags } from 'react-tag-input';

import TagsInput from "./TagsInput";

function PostForm({ user, handleSubmit }) {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });
  const [errors, setErrors] = useState([]);
  const [tags, setTags] = useState([]);
  const [tagSuggestions, setTagSuggestions] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);

  useEffect(() => {
        fetch("/tags").then((resp) => {
          if (resp.ok) {
            resp.json().then((tags) => {
              setTags(tags);
              const suggestions = tags.map(tag => {
                return {id: tag.name, text: tag.name};
              });
              setTagSuggestions(suggestions)
            });
          } else {
            setTagSuggestions([]);
          }
        });
      }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  };

  const handleContentChange = (e) => {
    console.log(e)
    setFormData({ ...formData, content: e.blocks[0].text });
  };

  const handleAddTag = (newTag) => {
    setSelectedTags([...selectedTags, newTag])
  };

  const handleDeleteTag = (i) => {
    const filteredTags = selectedTags.filter((tag, index) => index !== i);
    setSelectedTags(filteredTags);
  };

  const handleNewTagSubmission = (submittedTags) => {
    const newTags = selectedTags.map(tag => tag.text).filter(tag => !tags.find(tag));

    fetch("/tags", {
           method: "POST",
           headers: { "Content-Type": "application/json" },
           body: JSON.stringify(newTags),
         }).then((resp) => {
           if (resp.ok) {
             resp.json().then((addedTags) => {
               setTags([...tags, addedTags]);
             });
           } else {
             resp.json().then((json) => {
               setErrors([json.errors]);
             });
           }
         });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const post = {
      title: formData.title,
      content: formData.content,
      user: user,
      submitted_tags: selectedTags.map(tag => tag.text)
    };

    fetch("/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(post),
    }).then((resp) => {
      if (resp.ok) {
        resp.json().then((post) => {
          console.log(post);
        });
      } else {
        resp.json().then((json) => {
          setErrors([json.errors]);
        });
      }
    });
  };

  return (
    <div className="container">

    <ReactTags
      tags={selectedTags}
      suggestions={tagSuggestions}
      delimiters={[13]}
      handleAddition={handleAddTag}
      handleDelete={handleDeleteTag}
    />

    <form onSubmit={onSubmit}>
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
