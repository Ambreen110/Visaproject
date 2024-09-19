"use client"

import React, { useState } from 'react';

const UserRetrieve = () => {
  const [passportNumber, setPassportNumber] = useState('');
  const [dob, setDob] = useState('');
  const [visaData, setVisaData] = useState(null); // State to store retrieved visa data
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Make a GET request to retrieve visa details
      const response = await fetch(`/api/retreive?passportNo=${encodeURIComponent(passportNumber)}&dob=${encodeURIComponent(dob)}`);

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();

      if (data.length === 0) {
        setError('No visa found for the provided details.');
      } else {
        setVisaData(data[0]); // Assuming the response is an array with one document
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (visaData) {
      // Create a Blob from the visa data
      const blob = new Blob([JSON.stringify(visaData, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'visa-details.json';
      a.click();
      URL.revokeObjectURL(url);
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
