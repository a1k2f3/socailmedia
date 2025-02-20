"use client";
import React, { useEffect, useState } from "react";
import ProfileHeader from "./ProfileHeader";
import ProfileStats from "./ProfileStats";
import ProfilePosts from "./ProfilePost";

const ProfilePage = () => {
  const [userdata, setUserdata] = useState(null);  // Dynamic user data
  const [userpost, setUserpost] = useState([]);    // Dynamic user posts
  const [errorMessage, setErrorMessage] = useState(""); // Error handling
  const [loading, setLoading] = useState(true);    // Loading state

  useEffect(() => {
    const email = localStorage.getItem("email");
    const password = localStorage.getItem("password");

    // Fetch user details
    const fetchUserData = async () => {
      setLoading(true);
      try {
        if (!email || !password) {
          setErrorMessage("Email or password not found in localStorage.");
          setLoading(false);
          return;
        }

        const response = await fetch("http://localhost:3001/api/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });

        if (!response.ok) throw new Error("Error fetching user details.");

        const data = await response.json();
        console.log("Login successful", data);
        setUserdata(data.user);
      } catch (error) {
        setErrorMessage("Failed to fetch user details. Please check your credentials.");
        console.error("Error:", error.message);
      } finally {
        setLoading(false);
      }
    };

    // Fetch user posts
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

    fetchUserData();
    fetchUserPost();
  }, []);

  if (loading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <div className="loader"></div>
      </div>
    );
  }

  if (errorMessage) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <div className="text-red-500 text-xl">{errorMessage}</div>
      </div>
    );
  }

  return (
    <div className="flex md:flex-row">
      {/* Content Area */}
      <div className="flex w-full min-h-screen p-16">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg">
          {/* Header Section */}
          <ProfileHeader
            profilePicture={`http://localhost:3001${userdata.image}` || "default-pic.jpg"}
            name={userdata?.username || "User"}
            bio={userdata?.Userbio || "No bio available"}
          />

          {/* Stats Section */}
          <ProfileStats
            followers={userdata?.followers || 0}
            following={userdata?.following || 0}
            posts={userpost.length}
          />

          {/* Posts Section */}
          {userpost.length > 0 ? (
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6">
              {userpost.map((post, index) => (
                <ProfilePosts
                  key={index}
                  posts={`http://localhost:3001${post?.media}` || []} // Ensure media is passed as an array
                  caption={post.title || "No title available"}
                />
              ))}
            </div>
          ) : (
            <div className="text-gray-500 text-center mt-6">No posts available</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
