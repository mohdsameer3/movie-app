import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react"; // icons

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/trending", label: "Trending" },
    { to: "/about", label: "About" },
  ];

  return (
    <nav className="bg-[#0300146e] backdrop-blur-md fixed top-0 left-0 w-full z-50 shadow-lg">
      <div className="flex items-center justify-between px-6 py-4 w-full max-w-7xl mx-auto">
        
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-gradient">
          🎬 MovieApp
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-10">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `text-lg font-medium transition hover:text-gradient ${
                  isActive ? "text-gradient" : "text-gray-300"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        {/* Mobile Hamburger Button */}
        <button
          className="md:hidden text-gray-300 hover:text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-[#030014e6] backdrop-blur-md px-6 py-4 space-y-4">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `block text-lg font-medium transition hover:text-gradient ${
                  isActive ? "text-gradient" : "text-gray-300"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
