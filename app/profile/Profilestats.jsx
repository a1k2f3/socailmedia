import React from 'react';

const ProfileStats = ({ followers, following, posts }) => {
  return (
    <div className=" w-full flex justify-around bg-white p-4  mt-4">
      <div className="text-center">
        <h2 className="text-xl font-bold">{followers}</h2>
        <p className="text-gray-600">Followers</p>
      </div>
      <div className="text-center">
        <h2 className="text-xl font-bold">{following}</h2>
        <p className="text-gray-600">Following</p>
      </div>
      <div className="text-center">
        <h2 className="text-xl font-bold">{posts}</h2>
        <p className="text-gray-600">Posts</p>
      </div>
    </div>
  );
};

export default ProfileStats;
