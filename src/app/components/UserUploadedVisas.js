"use client";
import React, { useEffect, useState } from 'react';

function UserUploadedVisaList() {
  const [userVisas, setUserVisas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserUploadedVisas = async () => {
      try {
        const response = await fetch('/api/userUploadedVisas');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('Fetched user-uploaded visas:', data);
        setUserVisas(data);
      } catch (error) {
        console.error('Error fetching user-uploaded visas:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserUploadedVisas();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <table className="min-w-full border border-gray-300">
      <thead>
        <tr>
          <th className="border border-gray-300 p-2">Passport Number</th>
          <th className="border border-gray-300 p-2">Date of Birth</th>
          <th className="border border-gray-300 p-2">Download PDF</th>
        </tr>
      </thead>
      <tbody>
        {userVisas.length > 0 ? (
          userVisas.map((visa) => (
            <tr key={visa._id}>
              <td className="border border-gray-300 p-2">{visa.passportNo}</td>
              <td className="border border-gray-300 p-2">{new Date(visa.dob).toLocaleDateString()}</td>
              <td className="border border-gray-300 p-2">
                <a href={`/uploads/${visa.filename}`} className="text-blue-500" download>
                  Download
                </a>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="3" className="border border-gray-300 p-2 text-center">
              No user-uploaded visas available.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}

export default UserUploadedVisaList;
