"use client";
import { useState } from 'react';
import VisaList from '../components/VisaList';
import UploadVisa from '../components/UploadVisa'; 

export default function AdminPanel() {
  const [view, setView] = useState('list'); // 'list' or 'upload'

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <div className="flex justify-around mb-4">
        <button 
          onClick={() => setView('list')} 
          className={`px-4 py-2 rounded ${view === 'list' ? 'bg-green-600' : 'bg-green-500'} text-white hover:bg-green-700`}
        >
          View Visa List
        </button>
        <button 
          onClick={() => setView('upload')} 
          className={`px-4 py-2 rounded ${view === 'upload' ? 'bg-blue-600' : 'bg-blue-500'} text-white hover:bg-blue-700`}
        >
          Upload Visa Form
        </button>
      </div>
      {view === 'list' && <VisaList />}
      {view === 'upload' && <UploadVisa />}
    </div>
  );
}
