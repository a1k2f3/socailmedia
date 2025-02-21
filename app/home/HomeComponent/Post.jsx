"use client";
import React, { useEffect, useState, useCallback } from 'react';

const ProfilePosts = ({ posts, caption, postId }) => {
  const [isCommentDialogOpen, setIsCommentDialogOpen] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [comments, setComments] = useState([]); // Initialize as an empty array
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchComments = useCallback(async () => {
    if (!postId) return;
  
    try {
      setError(null);
      const response = await fetch(`http://localhost:3001/api/comment/${postId}`);
      if (!response.ok) throw new Error('Failed to fetch comments');
      
      const data = await response.json();
      console.log("Fetched comments:", data); // Log before updating state
      setComments(data || []);
    } catch (err) {
      console.error('Error fetching comments:', err);
      setError('Unable to load comments. Please try again later.');
    }
  }, [postId]);
  

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  const handleAddComment = async () => {
    if (!newComment.trim() || !newTitle.trim()) {
      alert('Both title and comment are required.');
      return;
    }

    const id = localStorage.getItem('id');
    const token = localStorage.getItem('authToken');
    if (!id || !token) {
      alert('User ID or token is missing.');
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`http://localhost:3001/api/post/comment/${postId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ content: newComment, title: newTitle, author_id: id, postId }),
      });

      const addedComment = await response.json();
      if (!response.ok) throw new Error(addedComment.message || 'Failed to add comment.');

      setNewComment('');
      setNewTitle('');
      fetchComments(); // Refresh comments after adding
    } catch (err) {
      console.error('Error adding comment:', err);
      setError('An error occurred while adding the comment.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform duration-300 transform hover:scale-105 hover:shadow-xl">
      {/* Post Image */}
      <div className="relative">
        <img
          src={posts}
          alt={caption}
          className="w-full h-[200px] object-cover"
          width={500}
          height={300}
        />
      </div>
      {/* Post Caption and Actions */}
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

      {/* Comment Dialog */}
      {isCommentDialogOpen && (
        <div
          className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50"
          aria-label="Comments Modal"
        >
          <div className="bg-white p-6 rounded-lg w-96 max-w-full">
            <h3 className="text-xl font-semibold mb-4">Comments</h3>

            {error && <p className="text-red-500">{error}</p>}

            <div className="space-y-4">
  {/* Existing Comments */}
  {comments.length > 0 ? (
    comments.map((comment) => (
      <div key={comment._id} className="p-2 border-b border-gray-200">
        <p className="text-sm font-semibold">{comment.title}</p>
        <p className="text-sm text-gray-600">{comment.content}</p>
      </div>
    ))
  ) : (
    <p className="text-gray-500">No comments yet.</p>
  )}
  <div className="flex flex-col gap-3">
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
      className="bg-blue-600 text-white px-4 py-2 rounded-md disabled:opacity-50"
      onClick={async () => {
        await handleAddComment();
        await fetchComments(); // Refresh comments after adding
      }}
      disabled={loading}
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
