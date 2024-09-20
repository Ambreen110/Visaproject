"use client";

import React, { useState } from 'react';

const UserRetrieve = () => {
  const [passportNumber, setPassportNumber] = useState('');
  const [dob, setDob] = useState('');
  const [visaData, setVisaData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
  
    try {
      const response = await fetch(`/api/retrieve?passportNo=${encodeURIComponent(passportNumber)}&dob=${encodeURIComponent(dob)}`);
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
  
      const a = document.createElement('a');
      a.href = url;
      a.download = 'visa.pdf';
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
  
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (visaData) {
      const link = document.createElement('a');
      link.href = `/api/download-pdf?passportNo=${encodeURIComponent(passportNumber)}&dob=${encodeURIComponent(dob)}`;
      link.download = 'visa-details.pdf';
      link.click();
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-6 mt-8">
      <h2 className="text-2xl font-bold mb-4">Retrieve Visa</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="passportNumber" className="block text-gray-700">Passport Number</label>
          <input
            type="text"
            id="passportNumber"
            value={passportNumber}
            onChange={(e) => setPassportNumber(e.target.value)}
            className="mt-1 p-2 w-full border border-gray-300 rounded-lg"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="dob" className="block text-gray-700">Date of Birth</label>
          <input
            type="date"
            id="dob"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            className="mt-1 p-2 w-full border border-gray-300 rounded-lg"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
        >
          Retrieve Visa
        </button>
      </form>

      {loading && <p className="mt-4 text-blue-500">Loading...</p>}
      {error && <p className="mt-4 text-red-500">{error}</p>}
      {visaData && (
        <div className="mt-4">
          <button
            onClick={handleDownload}
            className="w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600"
          >
            Download Visa Details
          </button>
        </div>
      )}
    </div>
  );
};

export default UserRetrieve;
