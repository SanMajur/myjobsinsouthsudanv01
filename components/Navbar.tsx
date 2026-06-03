"use client";

import { useState } from "react";
import Logo from "./navbar/Logo";
import NavLink from "./navbar/NavLink";
import PostJobButton from "./navbar/PostJobBtn";
import MobileDrawer from "./navbar/MobileDrawer";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="w-full bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between items-center">
          
          <Logo />

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <NavLink href="/signin">Sign In</NavLink>
            <NavLink href="/signup">Get Started</NavLink>
            <span className="h-5 w-[1px] bg-gray-200" aria-hidden="true" />
            <PostJobButton />
          </div>

          {/* Mobile Menu Trigger */}
          <div className="flex md:hidden">
            <button
              onClick={toggleMenu}
              type="button"
              className="inline-flex items-center justify-center rounded-md p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-600 focus:outline-none"
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Open main menu</span>
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            </button>
          </div>

        </div>
      </div>

      {/* Abstracted Drawer Interface */}
      <MobileDrawer isOpen={isOpen} onClose={closeMenu} />
    </nav>
  );
}