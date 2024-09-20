"use client"
import { useState } from 'react';
import '../styles/globals.css';

export default function RootLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <html lang="en">
      <head>
        <title>Visa Management System</title>
        <meta name="description" content="Manage and retrieve visa details easily." />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="bg-gray-100 text-gray-900 font-sans">
        <header className="bg-blue-600 text-white py-4 shadow-md">
          <div className="container mx-auto flex justify-between items-center px-4">
            <h1 className="text-2xl font-bold">Visa Management System</h1>

            <button
              className="md:hidden focus:outline-none"
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
          </div>
        </header>

        <div className="flex">
          <nav
            id="sidebar"
            className={`bg-white border-r border-gray-300 w-64 h-screen fixed top-0 md:static z-50 transform ${
              sidebarOpen ? 'translate-x-0' : '-translate-x-full'
            } transition-transform duration-300 ease-in-out md:translate-x-0`}
          >
            <div className="px-4 py-3">
              <ul className="space-y-2">
                <li>
                  <a href="/" className="block p-2 hover:bg-gray-200">
                    Home
                  </a>
                </li>
                <li>
                  <a href="/upload" className="block p-2 hover:bg-gray-200">
                    Upload Visa
                  </a>
                </li>
                <li>
                  <a href="/retrieve" className="block p-2 hover:bg-gray-200">
                    Retrieve Visa
                  </a>
                </li>
                <li>
                  <a href="/admin" className="block p-2 hover:bg-gray-200">
                    Admin Panel
                  </a>
                </li>
              </ul>
            </div>
          </nav>

          <main className="flex-1 container mx-auto py-8 px-4">
            {children}
          </main>
        </div>

        <footer className="bg-gray-800 text-white py-4 mt-8">
          <div className="container mx-auto text-center">
            <p>&copy; {new Date().getFullYear()} Visa Management System. All rights reserved.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
