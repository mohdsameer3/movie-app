import React from "react";
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-[#0300146e] backdrop-blur-md fixed top-0 left-0 w-full z-50 shadow-lg">
      <div className="flex items-center justify-between px-10 py-4 w-full">
        
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-gradient">
          🎬 MovieApp
        </Link>

        {/* Links */}
        <div className="flex gap-20">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `text-lg font-medium transition hover:text-gradient ${
                isActive ? "text-gradient" : "text-gray-300"
              }`
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/trending"
            className={({ isActive }) =>
              `text-lg font-medium transition hover:text-gradient ${
                isActive ? "text-gradient" : "text-gray-300"
              }`
            }
          >
            Trending
          </NavLink>

          <NavLink
            to="/about"
            className={({ isActive }) =>
              `text-lg font-medium transition hover:text-gradient ${
                isActive ? "text-gradient" : "text-gray-300"
              }`
            }
          >
            About
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
