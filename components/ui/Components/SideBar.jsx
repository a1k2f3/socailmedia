"use client"
import { Calendar, Home, Inbox, Search, Settings, UserRoundPen } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
export function AppSidebar() {
  const [search, setSearch] = useState('')
  const [searchuser,setuser] =useState('')
  const [suggestions, setSuggestions] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const searchUser=async(e)=>{
    e.preventDefault();
    if (!searchUser) {  
      setErrorMessage("Please fill all the fields");
      return;
    }
    try {
      const response = await fetch('http://localhost:3001/api/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username:searchuser }),
      });
  
      if (!response.ok) {
        throw new Error('search failed');
      }
  
      const data = await response.json();
      console.log('the user is here', data); // Process login response as needed
      
      
      
    } catch (error) {
      setErrorMessage(" Please check your credentials");
      console.error('Error:', error.message);
    }
  }
  useEffect(() => {
    if (searchuser.length > 2) {
      const delayDebounceFn = setTimeout(() => {
        fetchSuggestions(searchuser);
      }, 500); // Delay of 500ms

      return () => clearTimeout(delayDebounceFn); // Clear timeout on cleanup
    } else {
      setSuggestions([]); // Clear suggestions if input is too short
    }
  }, [searchuser]);
const fetchSuggestions=async(query)=>{
  try{
const response=await fetch(`http://localhost:3001/api/user? query=${query}`,{
  method:"GET",
  headers:{
    "Content-Type": "application/json",
  },
  
});
     if(!response.ok){
      throw new Error("failed to fetch user")
     }
     const data = await response.json();
      setSuggestions(data);
  }catch(error){
    setErrorMessage("Error fetching suggestions");
      console.error("Error:", error.message);
  }
}
const handelsuggestion=(suggestion)=>{
  setuser(suggestion)
  setSuggestions([])
}
  const items = [
    {
      title: "Home",
      url: "/home",
      icon: Home,
    },
    {
      title: "Profile",
      url: "/profile",
      icon: UserRoundPen,
    },
    {
      title: "Inbox",
      url: "#",
      icon: Inbox,
    },
    {
      title: "Calendar",
      url: "#",
      icon: Calendar,
    },
    {
      title: "Search",
      onClick:()=>setSearch(true), // Proper URL for search
      icon: Search,
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings,
    },
  ]

  return (

    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    {item.onClick?(
               <button onClick={item.onClick} className="flex items-center gap-2">
                       <item.icon />
                        <span>{item.title}</span>
               </button>
                    ):(
                      <Link href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    )}
                    
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Conditional Modal Rendering */}
      {search && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-96 max-w-full">
            <h3 className="text-xl font-semibold mb-4">Search</h3>

            <div className="space-y-4">
              <div className="space-y-2">
                {/* Add comment fields here */}
              </div>

              {/* New Comment Form */}
              <div className="flex flex-row gap-3 items-center space-x-3">
                <input
                  type="text"
                  className="border rounded-md p-2 w-full"
                  onChange={ (e)=>(setuser(e.target.value)) }
                  placeholder="username.."
                />
                <button className="bg-blue-600 text-white px-4 py-2 rounded-md" onClick={searchUser}>
                  <Search/>
                </button>
                
              </div>
            </div>
            {suggestions.length > 0 && (
        <ul className="absolute bg-white border rounded-md mt-1 w-full max-h-40 overflow-y-auto">
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              onClick={() => handelsuggestion(suggestion)}
              className="p-2 hover:bg-gray-100 cursor-pointer"
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
      {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
            {/* Close Button */}
            <button
              className="mt-4 text-red-500 hover:text-red-700"
              onClick={() => setSearch('')}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </Sidebar>
  )
}
