"use client";

import React, { useState, useEffect } from "react";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";

const TopNavigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  if (!mounted) return null;

  return (
    <>
      {/* Top Navigation Bar */}
      <nav className="top-navigation">
        {/* Logo Section */}
        <div className="nav-logo">
          <Link href="/" className="logo-link">
            <div className="logo-container">
              <div className="logo-icon">
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 40 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect width="40" height="40" rx="8" fill="#3B82F6" />
                  <path
                    d="M12 14H16V18H20V14H24V18H28V22H24V26H20V22H16V26H12V22H8V18H12V14Z"
                    fill="white"
                  />
                  <circle cx="20" cy="20" r="3" fill="white" />
                </svg>
              </div>
              <span className="logo-text">PixPro</span>
            </div>
          </Link>
        </div>

        {/* Right Section */}
        <div className="nav-right">
          {/* Theme Toggle */}
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="theme-toggle-btn"
            aria-label="Toggle theme"
          >
            <div className="theme-icon">
              {mounted && theme === "dark" ? (
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 2V4M12 20V22M4 12H2M6.31412 6.31412L4.8999 4.8999M17.6859 6.31412L19.1001 4.8999M6.31412 17.69L4.8999 19.1042M17.6859 17.69L19.1001 19.1042M22 12H20M17 12C17 14.7614 14.7614 17 12 17C9.23858 17 7 14.7614 7 12C7 9.23858 9.23858 7 12 7C14.7614 7 17 9.23858 17 12Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              ) : (
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </div>
          </button>

          {/* User Profile */}
          <div className="nav-profile">
            <UserButton
              afterSignOutUrl="/"
              appearance={{
                elements: {
                  avatarBox: "w-10 h-10 rounded-full",
                },
              }}
            />
          </div>

          {/* Hamburger Menu */}
          <button
            onClick={toggleMenu}
            className="hamburger-btn"
            aria-label="Toggle menu"
          >
            <div className={`hamburger ${isMenuOpen ? "active" : ""}`}>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </button>
        </div>
      </nav>

      {/* Dropdown Menu */}
      {isMenuOpen && (
        <>
          <div className="menu-backdrop" onClick={closeMenu}></div>
          <div className="dropdown-menu">
            <Link href="/profile" className="menu-item" onClick={closeMenu}>
              <div className="menu-icon">
                <Image
                  src="/assets/icons/profile.svg"
                  alt="Profile"
                  width={20}
                  height={20}
                />
              </div>
              <span>Profile</span>
            </Link>
            <Link href="/credits" className="menu-item" onClick={closeMenu}>
              <div className="menu-icon">
                <Image
                  src="/assets/icons/coins.svg"
                  alt="Credits"
                  width={20}
                  height={20}
                />
              </div>
              <span>Buy Credits</span>
            </Link>
          </div>
        </>
      )}
    </>
  );
};

export default TopNavigation;
