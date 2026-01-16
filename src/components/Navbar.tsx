import { Link } from "react-router-dom";
import { useState, useEffect } from "react"; 
import { supabaseClient } from "../supabaseClient";
import type { User } from "@supabase/supabase-js";

export default function Navbar() {
    // State to manage mobile menu visibility
    const [isOpen, setIsOpen] = useState(false);
    const [user, setUser] = useState<User | null>(null)

    // Effect to handle user session and auth state changes
    useEffect(() => {
      // Check for existing user session on component mount
      supabaseClient.auth.getUser().then(({ data }) => setUser(data.user))

      // Listen for auth state changes
      const { data: listener } = supabaseClient.auth.onAuthStateChange(
        (_event, session) => setUser(session?.user ?? null)
      )
      return () => listener.subscription.unsubscribe()
    }, [])

    const logout = async () => {
      // Sign out the user
      await supabaseClient.auth.signOut()

      // Clear user state
      setUser(null)
    }
    
    // Navbar container
    return (
      <nav className="w-full bg-indigo-300 shadow-md sticky top-0 z-50">
        <div className="max-w-full mx-auto h-16 px-2">
          <div className="flex justify-between h-16 items-center">
            {/* Left side */}
            <div className="hidden md:flex items-center gap-4">
              <Link to="/" className="font-semibold text-lg">Home</Link>
              {user && (
                <Link to="/create" className="font-semibold text-lg">Create New</Link>
              )}
            </div>

            {/* Right side desktop */}
            <div className="hidden md:flex items-center gap-4">
              {user ? (
                <button 
                  onClick={logout} 
                  className="bg-indigo-900 rounded-md p-2 font-semibold text-indigo-50 hover:scale-105 transition-transform"
                >
                  Logout <i className="fa-solid fa-arrow-right-from-bracket"></i>
                </button>
              ) : (
                <>
                  <Link 
                    to="/register" 
                    className="bg-indigo-50 rounded-md p-2 border-2 border-indigo-900 font-semibold text-indigo-900 hover:scale-105 transition-transform"
                  >
                    Register
                  </Link>
                  <Link 
                    to="/login" 
                    className="bg-indigo-900 rounded-md p-2 font-semibold text-indigo-50 hover:scale-105 transition-transform"
                  >
                    Login <i className="fa-solid fa-arrow-right-to-bracket"></i>
                  </Link>
                </>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button 
                onClick={() => setIsOpen(!isOpen)}
                className="text-zinc-900 focus:outline-none"
              >
                <i className={`fa-solid ${isOpen ? 'fa-xmark' : 'fa-bars'} text-2xl cursor-pointer`}></i>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden px-4 pt-2 pb-4 flex flex-col gap-2 bg-indigo-100">
            {user ? (
              <>
                <Link to="/" className="font-semibold text-md text-zinc-900 hover:text-indigo-500">Home</Link>
                <Link to="/create" className="font-semibold text-md text-zinc-900 hover:text-indigo-500">Create New</Link>
                <button 
                  onClick={logout} 
                  className="font-semibold text-md text-zinc-900 hover:text-indigo-500"
                >
                  Logout <i className="fa-solid fa-arrow-right-from-bracket"></i>
                </button>
              </>
            ) : (
              <>
                <Link to="/" className="font-semibold text-md text-zinc-900 hover:text-indigo-500">Home</Link>
                <Link 
                  to="/register" 
                  className="font-semibold text-md text-zinc-900 hover:text-indigo-500"
                >
                  Register
                </Link>
                <Link 
                  to="/login" 
                  className="font-semibold text-md text-zinc-900 hover:text-indigo-500"
                >
                  Login <i className="fa-solid fa-arrow-right-to-bracket"></i>
                </Link>
              </>
            )}
          </div>
        )}
      </nav>
    );
}