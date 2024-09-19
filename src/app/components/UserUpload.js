"use client"
import React, { useState } from 'react';

const UserUpload = () => {
  const [passportNumber, setPassportNumber] = useState('');
  const [dob, setDob] = useState('');
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Implement file upload logic here
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-6 mt-8">
      <h2 className="text-2xl font-bold mb-4">Upload Visa</h2>
      <form method="POST" action="/api/upload" encType="multipart/form-data">

      {/* <form onSubmit={handleSubmit}> */}
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
        <div className="mb-4">
          <label htmlFor="file" className="block text-gray-700">Visa Scan</label>
          <input
            type="file"
            id="file"
            onChange={(e) => setFile(e.target.files[0])}
            className="mt-1 p-2 w-full border border-gray-300 rounded-lg"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
        >
          Upload Visa
        </button>
      </form>
    </div>
  );
};

export default UserUpload;
