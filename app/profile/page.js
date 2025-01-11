"use client";
import React, { useEffect, useState } from "react";
import ProfileHeader from "./Profileheader";
import ProfileStats from "./Profilestats";
import ProfilePosts from "./Profilepost";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/ui/Components/SideBar";

const ProfilePage = () => {
  const [userdata, setUserdata] = useState(null); // Dynamic user data
  const [errorMessage, setErrorMessage] = useState(""); // Error handling
  const [loading, setLoading] = useState(true); // Loading state

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
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
          throw new Error("Error fetching user details.");
        }

        const data = await response.json();
        console.log("Login successful", data);
        const { user } = data;

        if (user) {
          setUserdata(user); // Set only user object
        }
        setLoading(false);
      } catch (error) {
        setErrorMessage("Failed to fetch user details. Please check your credentials.");
        setLoading(false);
        console.error("Error:", error.message);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <div>Loading...</div>
      </div>
    );
  }

  if (errorMessage) {
    return <div className="text-red-500">{errorMessage}</div>;
  }

  return (
    <>
      <div className="flex  md:flex-row">
       

        {/* Content Area */}
        <div className="flex w-full min-h-screen  p-16">
          <div className="max-w-4xl mx-auto bg-white rounded-lg ">
            {/* Header Section */}
            <ProfileHeader
              profilePicture={`http://localhost:3001${userdata.image}` || "default-pic.jpg"}
              name={userdata.username || "User"}
              bio={userdata.Userbio || "No bio available"}
            />

            {/* Stats Section */}
            <ProfileStats
              followers={userdata.followers || 0}
              following={userdata.following || 0}
              posts={userdata.posts ? userdata.posts.length : 0}
            />

            {/* Posts Section */}
            {userdata.posts && userdata.posts.length > 0 ? (
              <ProfilePosts posts={userdata.posts} />
            ) : (
              <div>No posts available</div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
