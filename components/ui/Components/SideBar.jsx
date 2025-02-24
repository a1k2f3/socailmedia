"use client"
import { Calendar, Home, Inbox, Search, Settings, UserRoundPen,BadgePlus  } from "lucide-react"
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
import local from "next/font/local"

export function AppSidebar() {
  const [search, setSearch] = useState(false)
  const [searchUserInput, setSearchUserInput] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  // Fetch suggestions with debounce
  useEffect(() => {
    if (searchUserInput.length > 1) {
      const delayDebounceFn = setTimeout(() => fetchSuggestions(searchUserInput), 500)
      return () => clearTimeout(delayDebounceFn)
    }
    setSuggestions([])
  }, [searchUserInput])

  const fetchSuggestions = async (query) => {
    try {
      setLoading(true)
      const response = await fetch(`http://localhost:3001/api/user?query=${query}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      })
      if (!response.ok) throw new Error("Failed to fetch user suggestions")

      const data = await response.json()
      setSuggestions(data)
    } catch (error) {
      setErrorMessage("Error fetching suggestions")
      console.error("Error:", error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleSuggestionClick = (suggestion) => {
    setSearchUserInput(suggestion)
    setSuggestions([])
  }

  const handleSearchUser = async (e) => {
    e.preventDefault()
    const id=localStorage.getItem('id');
    if (!searchUserInput) {
      setErrorMessage("Please enter a username")
      return
    }
    try {
      setLoading(true)
      const response = await fetch('http://localhost:3001/api/user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: searchUserInput,author_id:id }),
      })
      if (!response.ok) throw new Error("Search failed")

      const data = await response.json()
      console.log("User found:", data)
    } catch (error) {
      setErrorMessage("Please check your input")
      console.error("Error:", error.message)
    } finally {
      setLoading(false)
    }
  }

  const items = [
    { title: "Home", url: "/home", icon: Home },
    { title: "Profile", url: "/profile", icon: UserRoundPen },
    { title: "Inbox", url: "#", icon: Inbox },
    { title: "Calendar", url: "#", icon: Calendar },
    { title: "Search", onClick: () => setSearch(true), icon: Search },
    { title: "Settings", url: "#", icon: Settings },
    { title: "Create", url: "/post", icon: BadgePlus },
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
        {item.onClick ? (
          <button onClick={item.onClick} className="flex items-center gap-x-3">
            <item.icon className="w-6 h-6" />
            <span className="text-sm font-medium">{item.title}</span>
          </button>
        ) : (
          <Link href={item.url} className="flex items-center gap-x-3">
            <item.icon className="w-6 h-6" />
            <span className="text-sm font-medium">{item.title}</span>
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
            <h3 className="text-xl font-semibold mb-4">Search User</h3>

            <div className="relative space-y-4">
              <input
                type="text"
                className="border rounded-md p-2 w-full"
                value={searchUserInput}
                onChange={(e) => {
                  setSearchUserInput(e.target.value)
                  setErrorMessage("")
                }}
                placeholder="Enter username..."
                aria-label="Search user"
              />
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded-md w-full"
                onClick={handleSearchUser}
                disabled={loading}
              >
                {loading ? "Searching..." : "Search"}
              </button>

              {suggestions.length > 0 && (
                <ul className="absolute bg-white border rounded-md mt-1 w-full max-h-40 overflow-y-auto">
                  {suggestions.map((suggestion, index) => (
                    <li
                      key={index}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="p-2 hover:bg-gray-100 cursor-pointer"
                      aria-label={`Suggestion: ${suggestion}`}
                    >
                      {suggestion}
                    </li>
                  ))}
                </ul>
              )}
              {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
            </div>

            {/* Close Button */}
            <button
              className="mt-4 text-red-500 hover:text-red-700"
              onClick={() => setSearch(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </Sidebar>
  )
}
