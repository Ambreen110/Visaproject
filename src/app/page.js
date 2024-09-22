import { FaPassport } from "react-icons/fa";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-lg p-8 flex flex-col items-center text-center space-y-4 max-w-md w-full">
        <div className="text-blue-500 mb-4">
          <FaPassport size={60} />
        </div>

        <h2 className="text-4xl font-bold text-gray-800">
          Welcome to Visa Management System
        </h2>

        <p className="text-gray-600 text-lg">
          Effortlessly manage and retrieve visa details in just a few clicks.
        </p>

        <a
          href="/retrieve"
          className="mt-6 bg-blue-600 text-white py-2 px-6 rounded-lg shadow-md hover:bg-blue-700 transition duration-200"
        >
          Get Started
        </a>
      </div>
    </div>
  );
}
