import React from 'react';

const ProfileHeader = ({ profilePicture, name, bio }) => {
  return (
    <div className="bg-white p-6 w-full ">
      <div className=" w-full flex items-center gap-32 px-10 py-20">
        <img
          src={profilePicture}
          alt={`${name}'s profile`}
          className="w-[200px] h-[200px] rounded-full object-cover border-2 "
        />
        <div className="ml-10">
          <h1 className="text-4xl font-bold">{name}</h1>
          <p className="text-gray-600">{bio}</p>
        </div>
      </div>
      <button className='p-4 w-40 mt-2 ml-10 bg-slate-50 text-20 font-bold rounded-lg'>Edit Profile</button>
    </div>
  );
};

export default ProfileHeader;
