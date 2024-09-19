import '../styles/globals.css';

export default function RootLayout({ children }) {
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
            <h1 className="text-3xl font-bold">Visa Management System</h1>
            <nav>
              <ul className="flex space-x-4">
                <li><a href="/" className="hover:underline">Home</a></li>
                <li><a href="/upload" className="hover:underline">Upload Visa</a></li>
                <li><a href="/retrieve" className="hover:underline">Retrieve Visa</a></li>
                <li><a href="/admin" className="hover:underline">Admin Panel</a></li>
              </ul>
            </nav>
          </div>
        </header>
        <main className="container mx-auto py-8 px-4">
          {children}
        </main>
        <footer className="bg-gray-800 text-white py-4 mt-8">
          <div className="container mx-auto text-center">
            <p>&copy; {new Date().getFullYear()} Visa Management System. All rights reserved.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
