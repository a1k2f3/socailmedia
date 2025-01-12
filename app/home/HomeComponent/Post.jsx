"use client";
import React, { useEffect, useState } from 'react';

const ProfilePosts = ({ posts, caption, postId }) => {
  const [isCommentDialogOpen, setIsCommentDialogOpen] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch comments for the post
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/posts/${postId}/comments`);
        const data = await response.json();
        setComments(data); // Ensure data is an array of comments
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };
    fetchComments();
  }, [postId]); // Re-fetch when postId changes

  // Handle adding a new comment
  const handleAddComment = async () => {
    if (!newComment.trim() || !newTitle.trim()) return; // Don't allow empty comment or title
    
    const id = localStorage.getItem('id');
    if (!id) {
      console.error("User ID is missing from localStorage.");
      return;
    }
    
    try {
      const value = {
        content: newComment,
        title: newTitle,  // Ensure title is passed here
        author_id: id, 
        postId: postId, // Use postId here
      };
    
      setLoading(true); // Show loading indicator
      const token = localStorage.getItem('authToken');
      const response = await fetch(`http://localhost:3001/api/post/comment/${postId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(value),
      });
    
      const addedComment = await response.json();
      if (response.ok) {
        setComments([...comments, addedComment.comment]); // Add the new comment to the list
        setNewComment(''); // Clear the input field
        setNewTitle('');  // Clear the title field
      } else {
        console.error('Failed to add comment:', addedComment.message);
      }
    } catch (error) {
      console.error('Error adding comment:', error);
    } finally {
      setLoading(false); // Hide loading indicator
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform duration-300 transform hover:scale-105 hover:shadow-xl">
      <div className="relative">
        <img
          src={posts}
          alt={caption}
          className="w-full h-[200px] object-cover"
          width={500}
          height={300}
        />
      </div>
      <div className="p-4">
        <p className="text-lg font-semibold text-gray-800 mb-2">{caption}</p>
        <div className="flex items-center space-x-3">
          <button className="text-blue-600 hover:text-blue-800 transition-colors">
            Like
          </button>
          <button
            className="text-blue-600 hover:text-blue-800 transition-colors"
            onClick={() => setIsCommentDialogOpen(true)}
          >
            Comment
          </button>
          <button className="text-blue-600 hover:text-blue-800 transition-colors">
            Share
          </button>
        </div>
      </div>
      {isCommentDialogOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-96 max-w-full">
            <h3 className="text-xl font-semibold mb-4">Comments</h3>
            <div className="space-y-4">
              {/* Existing Comments */}
              <div className="space-y-2">
                {comments.length > 0 ? (
                  comments.map((comment, index) => (
                    <div key={index} className="p-2 border-b border-gray-200">
                      <p className="text-sm text-gray-600">{comment.content}</p> {/* Display the content of each comment */}
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">No comments yet.</p>
                )}
              </div>

              {/* New Comment Form */}
              <div className="flex flex-col gap-3 items-center space-x-3">
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="border rounded-md p-2 w-full"
                  placeholder="Add a title..."
                />
                <input
                  type="text"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="border rounded-md p-2 w-full"
                  placeholder="Add a comment..."
                />
                <button
                  className="bg-blue-600 text-white px-4 py-2 rounded-md"
                  onClick={handleAddComment}
                  disabled={loading} // Disable button while loading
                >
                  {loading ? 'Adding...' : 'Add'}
                </button>
              </div>
            </div>

            {/* Close Button */}
            <button
              className="mt-4 text-red-500 hover:text-red-700"
              onClick={() => setIsCommentDialogOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePosts;
