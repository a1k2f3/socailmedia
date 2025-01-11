"use client";
import React, { useState } from "react";

const AddPost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [media, setMedia] = useState([]);
  const [preview, setPreview] = useState([]);

  const handleMediaChange = (e) => {
    const files = Array.from(e.target.files);
    setMedia(files);
    setPreview(files.map((file) => URL.createObjectURL(file)));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !content) {
      alert("Title and content are required!");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);

    // Append each file to the formData
    media.forEach((file) => formData.append("media", file));

    try {
      const response = await fetch("http://localhost:3001/api/post", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert("Post added successfully!");
        setTitle("");
        setContent("");
        setMedia([]);
        setPreview([]);
      } else {
        alert("Failed to add post!");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred!");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Add New Post</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded"
            placeholder="Enter your post title"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded"
            rows="5"
            placeholder="Write your post content"
          ></textarea>
        </div>

        <div>
          <label className="block font-medium mb-1">Upload Media</label>
          <input
            type="file"
            multiple
            onChange={handleMediaChange}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border-0 file:bg-gray-100 file:text-gray-700"
          />
          <div className="flex space-x-4 mt-2">
            {preview.map((src, index) => (
              <img
                key={index}
                src={src}
                alt={`Preview ${index + 1}`}
                className="w-20 h-20 object-cover rounded"
              />
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Submit Post
        </button>
      </form>
    </div>
  );
};

export default AddPost;
