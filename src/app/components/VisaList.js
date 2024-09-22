"use client";
import React, { useEffect, useState } from "react";

function VisaList() {
  const [visas, setVisas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const visasPerPage = 10; 

  useEffect(() => {
    const fetchVisas = async () => {
      try {
        const response = await fetch("/api/visas");
        if (!response.ok) {
          console.error("Network response was not ok:", response.statusText);
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log("Fetched visas:", data);
        setVisas(data);
      } catch (error) {
        console.error("Error fetching visas:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchVisas();
  }, []);

  const indexOfLastVisa = currentPage * visasPerPage;
  const indexOfFirstVisa = indexOfLastVisa - visasPerPage;
  const currentVisas = visas.slice(indexOfFirstVisa, indexOfLastVisa);
  const totalPages = Math.ceil(visas.length / visasPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <table className="min-w-full border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">Visa Number</th>
            <th className="border border-gray-300 p-2">Full Name (English)</th>
            <th className="border border-gray-300 p-2">Passport Number</th>
            <th className="border border-gray-300 p-2">Date of Birth</th>
            <th className="border border-gray-300 p-2">Download PDF</th>
          </tr>
        </thead>
        <tbody>
          {currentVisas.length > 0 ? (
            currentVisas.map((visa) => (
              <tr key={visa._id}>
                <td className="border border-gray-300 p-2">{visa.visaNumber}</td>
                <td className="border border-gray-300 p-2">{visa.fullNameEnglish}</td>
                <td className="border border-gray-300 p-2">{visa.passportNo}</td>
                <td className="border border-gray-300 p-2">{new Date(visa.dob).toLocaleDateString()}</td>
                <td className="border border-gray-300 p-2">
                  <a href={`/uploads/${visa.visaNumber}.pdf`} className="text-blue-500" download>
                    Download
                  </a>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="border border-gray-300 p-2 text-center">
                No visa details available.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="flex justify-between mt-4">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className={`px-4 py-2 bg-gray-300 rounded ${currentPage === 1 ? 'cursor-not-allowed' : 'cursor-pointer'}`}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 bg-gray-300 rounded ${currentPage === totalPages ? 'cursor-not-allowed' : 'cursor-pointer'}`}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default VisaList;
