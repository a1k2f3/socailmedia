"use client";
import React, { useEffect, useState } from "react";
import ProfilePosts from "./HomeComponent/Post";

function Page() {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    // const id=localStorage.getItem("id");
    
    setIsAuthenticated(Boolean(token));

    const fetchUserPosts = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/post");
        if (!response.ok) throw new Error("Error fetching user posts.");
        
        const posts = await response.json();
        setUserPosts(posts);
      } catch (error) {
        setErrorMessage("Failed to fetch user posts.");
        console.error("Error:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserPosts();
  }, []);

  if (isAuthenticated === null) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-200">
        <span className="text-xl text-gray-700">Loading...</span>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-200">
        <span className="text-xl text-red-500">You are not authenticated</span>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen flex flex-col">
      {/* Main Content */}
      <div className="w-full mx-auto max-w-6xl p-7 mt-8 flex flex-col">
        {loading ? (
          <p className="text-gray-700 text-center mt-6">Loading posts...</p>
        ) : errorMessage ? (
          <p className="text-red-500 text-center mt-6">{errorMessage}</p>
        ) : (
          <div className="flex w-full flex-col items-center sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-1 gap-6 mt-8">
            {userPosts.length > 0 ? (
              userPosts.map((post) => (
                <ProfilePosts
                  key={post._id}
                  postId={post._id}
                  posts={`http://localhost:3001/media/${post.media}`}
                  caption={post.title || "No title available"}
                />
              ))
            ) : (
              <p className="text-gray-500 text-center mt-6">No posts available</p>
            )}
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-white shadow-md p-4 mt-8 text-center text-sm text-gray-500">
        © 2025 SocialApp. All Rights Reserved.
      </footer>
    </div>
  );
}

export default Page;
