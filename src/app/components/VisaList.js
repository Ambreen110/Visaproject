"use client";
import React, { useState, useEffect } from 'react';

function VisaList() {
  const [visas, setVisas] = useState([]);

  useEffect(() => {
    const fetchVisas = async () => {
      try {
        const response = await fetch('/api/visas');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setVisas(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Failed to fetch visas', error);
      }
    };

    fetchVisas();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/visas/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete visa');
      }
      setVisas(visas.filter(visa => visa._id !== id)); // Update the state to remove the deleted visa
    } catch (error) {
      console.error('Error deleting visa', error);
    }
  };

  const handleEdit = (id) => {
    // Implement your edit logic, possibly redirect to an edit form
    console.log('Edit visa with ID:', id);
  };

  const handleChangeStatus = (id) => {
    // Implement your change status logic
    console.log('Change status for visa with ID:', id);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-4xl bg-white shadow-md rounded-lg p-6">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2 text-left">Passport Number</th>
              <th className="px-4 py-2 text-left">Date Of Birth</th>
              <th className="px-4 py-2 text-left">File Path</th>
              <th className="px-4 py-2 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {visas.map((visa) => (
              <tr key={visa._id} className="border-b">
                <td className="px-4 py-2">{visa.passportNumber}</td>
                <td className="px-4 py-2">{new Date(visa.dob).toLocaleDateString()}</td>
                <td className="px-4 py-2">{visa.filePath}</td>
                <td className="px-4 py-2">
                  <button className="bg-blue-500 text-white px-4 py-2 rounded mr-2 hover:bg-blue-700">
                    Open And Download
                  </button>
                  <button
                    className="bg-yellow-500 text-white px-4 py-2 rounded mr-2 hover:bg-yellow-600"
                    onClick={() => handleChangeStatus(visa._id)}
                  >
                    Change Status
                  </button>
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded mr-2 hover:bg-blue-700"
                    onClick={() => handleEdit(visa._id)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    onClick={() => handleDelete(visa._id)}
                  >
                    Delete From Database
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default VisaList;
