"use client";
import { useRouter } from 'next/navigation';
import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import Nva from '@/components/ui/Components/Nva';

const socket = io("http://localhost:3001"); // Initialize socket connection

export default function Home() {
  const [errorMessage, setErrorMessage] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  // Handle form field changes
  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    
    if (!email || !password) {
      setErrorMessage("Please fill all the fields");
      return;
    }

    try {
      const response = await fetch('http://localhost:3001/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }
      const data = await response.json();
      console.log('Login successful', data);
      const { token, id } = data;
      if (token) {
        // Save data in localStorage
        localStorage.setItem('authToken', token);
        localStorage.setItem('email', email);
        localStorage.setItem('password', password);
        localStorage.setItem('id', id);
        socket.emit("userloggedin", { email, id });
        router.push('/home');
        setEmail("");
        setPassword("");
      }
    } catch (error) {
      setErrorMessage("Login failed: Please check your credentials");
      console.error('Error:', error.message);
    }
  };
  useEffect(() => {
    socket.on("message", (msg) => {
      console.log("Message from server:", msg);
    });
    // Cleanup socket listeners when component unmounts
    return () => {
      socket.off("message");
    };
  }, []);
  return (
    <>
      <Nva />
      <div className="flex justify-center items-center h-screen">
        <div className="w-76 p-8 flex flex-col justify-center items-center shadow-lg rounded-xl">
          <h1 className="text-3xl font-bold mb-6">Log in</h1>
          {errorMessage && (
            <p className="text-red-600 mb-4">{errorMessage}</p>
          )}
          <form onSubmit={handleSubmit}>
            <div>
              <input 
                type="email" 
                placeholder="Enter your Email" 
                className="w-60 p-2 border-2 border-black rounded-lg invalid:border-rose-600 invalid:bg-red-100 my-4" 
                value={email} 
                onChange={handleEmail} 
                required
              />
            </div>
            <div>
              <input 
                type="password" 
                placeholder="Enter your Password" 
                className="w-60 p-2 border-2 border-black rounded-lg my-4" 
                value={password} 
                onChange={handlePassword} 
                required
              />
            </div>
            <button 
              className="max-w-96 px-10 py-2 bg-green-600 rounded-lg hover:bg-green-300 text-xl text-white"
              type="submit"
            >
              Login
            </button> 
          </form>
        </div>
      </div>
    </>
  );
}
