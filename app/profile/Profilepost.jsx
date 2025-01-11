import React from 'react';
const ProfilePosts = ({ posts }) => {
  return (
    <div className="grid grid-cols-5 gap-5 p-4 mt-4">
      {posts.map((post, index) => (
        <div key={index} className="bg-white shadow-md rounded-lg overflow-hidden">
          <img
            src={post.image}
            alt={post.caption}
            className="w-[300px] h-48 object-cover"
          />
          <div className="p-2">
            <p className="text-sm text-gray-700">{post.caption}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProfilePosts;
