"use client";
import React, { useEffect, useState } from 'react';
import ProfilePosts from './HomeComponent/Post';

function Page() {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [userpost, setUserpost] = useState([]);
  const [Loading, setLoading] = useState(true);
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsAuthenticated(true);  // Set to true if token exists
    } else {
      setIsAuthenticated(false);  // Set to false if no token
    }

    const fetchUserPost = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/post", { method: "GET" });
        if (!response.ok) throw new Error("Error fetching user posts.");
        const posts = await response.json(); // Assuming posts is an array
        setUserpost(posts);
      } catch (error) {
        setErrorMessage("Failed to fetch user posts.");
        console.error("Error:", error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchUserPost();
  }, []);

  if (isAuthenticated === null) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-200">
        <div className="text-xl text-gray-700">Loading...</div>
      </div>
    );  // Show loading until authentication check completes
  }

  if (!isAuthenticated) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-200">
        <div className="text-xl text-red-500">You are not authenticated</div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen  flex flex-col ">
      {/* Navigation Bar */}
     

      {/* Main Content */}
      <div className="w-full mx-20 p-7  mt-8 flex flex-col">
        <div className=" flex  w-full min-h-screen flex-col justify-center item center  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
          {userpost.length > 0 ? (
            userpost.map((post, index) => (
              <ProfilePosts
                key={index}
                postId={post._id}
                posts={`http://localhost:3001${post?.media}` || []} // Ensure media is passed as an array
                caption={post.title || "No title available"}
              />
            ))
          ) : (
            <div className="text-gray-500 text-center mt-6">No posts available</div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="bg-white shadow-md p-4 mt-8">
        <div className="text-center text-sm text-gray-500">
          © 2025 SocialApp. All Rights Reserved.
        </div>
      </div>
    </div>
  );
}

export default Page;
