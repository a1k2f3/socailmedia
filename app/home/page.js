"use client";
import React, { useEffect, useState } from 'react';

function Page() {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsAuthenticated(true);  // Set to true if token exists
    } else {
      setIsAuthenticated(false);  // Set to false if no token
    }
  }, []);

  if (isAuthenticated === null) {
    return <div>Loading...</div>;  // Show loading until authentication check completes
  }

  if (!isAuthenticated) {
    return (
      <div>
        You are not authenticated
      </div>
    );
  }

  return (
    <div>
      Home
    </div>
  );
}

export default Page;
