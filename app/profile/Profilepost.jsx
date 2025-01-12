import React from 'react';
// import Image from 'next/image';
const ProfilePosts = ({ posts,caption }) => {
  return (
      
        <div  className="bg-white shadow-md rounded-lg overflow-hidden">
          <img
            src={posts}
            alt={caption}
            className="w-[500px] h-48 "
            width={200}
             height={300}
          />
          <div className="p-2">
            <p className="text-sm text-gray-700">{caption}</p>
          </div>
        </div>
      
   
  );
};

export default ProfilePosts;
