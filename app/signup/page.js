"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Nva from "@/components/ui/Components/Nva";

const Register = () => {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [date_of_birth, setDob] = useState("");
  const [country, setCountry] = useState("");
  const [Userbio, setUserbio] = useState("");
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !contact || !email || !password || !date_of_birth || !country) {
      setError("Please fill all the fields");
      return;
    }

    setError("");

    const formData = new FormData();
    formData.append("username", name);
    formData.append("email", email);
    formData.append("phone", contact);
    formData.append("date_of_birth", date_of_birth);
    formData.append("password", password);
    formData.append("country", country);
    formData.append("Userbio", Userbio);
    if (file) formData.append("image", file);

    try {
      const response = await fetch("http://localhost:3001/api/signup", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert("Registration successful!");
        setName("");
        setContact("");
        setEmail("");
        setPassword("");
        setDob("");
        setCountry("");
        setUserbio("");
        setFile(null);
        router.push("/");
      } else {
        const errorData = await response.json();
        console.error("Error response:", errorData);
        setError(errorData.message || "An error occurred.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setError("An error occurred while submitting the form.");
    }
  };

  return (
    <>
      <Nva />
      <div className="mt-10 w-96 flex flex-col justify-center items-center rounded-xl h-auto mx-auto shadow-lg p-6 bg-white">
        <h1 className="text-3xl mt-0 font-bold">Sign-up</h1>
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <input type="text" placeholder="Enter your name" value={name} onChange={(e) => setName(e.target.value)} className="w-60 p-2 border-2 border-black rounded-lg my-2" />
          <input type="email" placeholder="Enter your Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-60 p-2 my-2 border-2 border-black rounded-lg" />
          <input type="number" placeholder="Enter your contact" value={contact} onChange={(e) => setContact(e.target.value)} className="w-60 my-2 p-2 border-2 border-black rounded-lg" />
          <input type="date" placeholder="Enter your date of birth" value={date_of_birth} onChange={(e) => setDob(e.target.value)} className="w-60 p-2 border-2 border-black rounded-lg my-2" />
          <input type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-60 p-2 my-2 border-2 border-black rounded-lg" />
          <input type="file" accept=".jpg,.png,.gif" onChange={(e) => setFile(e.target.files[0])} className="block my-2 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none" />
          {file && (
            <div className="flex flex-col items-center">
              <img src={URL.createObjectURL(file)} alt="Preview" className="w-24 h-24 rounded-full my-2" />
              <p className="text-sm">{file.name}</p>
              <button onClick={() => setFile(null)} className="text-red-500 text-sm">Remove</button>
            </div>
          )}
          <select onChange={(e) => setCountry(e.target.value)} className="w-60 p-2 border-2 border-black rounded-lg my-2">
            <option value="" disabled selected>Select Country</option>
            <option value="pakistan">Pakistan</option>
            <option value="turkey">Turkey</option>
            <option value="bangladesh">Bangladesh</option>
            <option value="afghanistan">Afghanistan</option>
          </select>
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          <button type="submit" className="max-w-96 px-10 py-2 bg-green-600 rounded-lg hover:bg-green-300 text-xl text-white mt-2">Register</button>
        </form>
        <Link href="/login" className="mt-4 text-blue-500 hover:underline">Already have an account? Login here</Link>
      </div>
    </>
  );
};

export default Register;
