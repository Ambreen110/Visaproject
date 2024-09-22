"use client";
import { useState } from "react";
import "../styles/globals.css";

export default function RootLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <html lang="en">
      <head>
        <title>Visa Management System</title>
        <meta
          name="description"
          content="Manage and retrieve visa details easily."
        />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="bg-gray-100 text-gray-900 font-sans">
        <header className="fixed top-0 left-0 right-0 w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md h-16 flex items-center justify-center px-4 z-50">
  {/* Sidebar Toggle Button */}
  <button
    className="absolute left-4 top-1/2 transform -translate-y-1/2 md:hidden focus:outline-none"
    onClick={toggleSidebar}
    aria-label="Toggle navigation"
  >
    <svg
      className="w-6 h-6"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M4 6h16M4 12h16M4 18h16"
      ></path>
    </svg>
  </button>

  {/* Centered Title */}
  <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-center truncate">
    Visa Management System
  </h1>
</header>



        <div className="flex min-h-screen">
          <nav
            id="sidebar"
            className={`bg-gradient-to-r from-gray-800 to-gray-700 text-white w-64 h-full fixed top-0 z-50 transform ${
              sidebarOpen ? "translate-x-0" : "-translate-x-full"
            } transition-transform duration-300 ease-in-out md:translate-x-0`}
          >
            <div className="px-4 py-6">
              <ul className="space-y-4">
                <li>
                  <a
                    href="/"
                    className="block p-3 rounded hover:bg-gray-600 transition-colors"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="/retrieve"
                    className="block p-3 rounded hover:bg-gray-600 transition-colors"
                  >
                    Retrieve Visa
                  </a>
                </li>
                <li>
                  <a
                    href="/admin"
                    className="block p-3 rounded hover:bg-gray-600 transition-colors"
                  >
                    Admin Panel
                  </a>
                </li>
              </ul>
            </div>
          </nav>

          <main className="flex-1 p-4 sm:p-6 md:p-8 bg-gray-50 items-center justify-center md:ml-60">
  <div className="flex flex-col w-full h-full justify-center max-w-full sm:max-w-lg md:max-w-2xl lg:max-w-4xl overflow-x-hidden">
    {children}
  </div>
</main>





        </div>

        <footer className="bg-gray-900 text-white py-4">
          <div className="container mx-auto text-center">
            <p>
              &copy; {new Date().getFullYear()} Visa Management System. All
              rights reserved.
            </p>
          </div>
        </footer>

        <div
          className={`fixed inset-0 bg-black opacity-50 z-40 md:hidden ${
            sidebarOpen ? "block" : "hidden"
          }`}
          onClick={toggleSidebar}
        ></div>
      </body>
    </html>
  );
}
