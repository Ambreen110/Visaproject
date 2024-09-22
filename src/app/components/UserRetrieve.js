"use client"
import { useState } from 'react';

export default function VisaChecker() {
  const [passportNo, setPassportNo] = useState('');
  const [dob, setDob] = useState('');

  const handleCheckVisa = async () => {
    try {
      const response = await fetch(`/api/retrieve?passportNo=${passportNo}&dob=${dob}`);

      if (response.status === 200) {
        alert('Visa found successfully!');
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `${passportNo}_visa.pdf`);
        document.body.appendChild(link);
        link.click();
        link.remove();
      } else if (response.status === 404) {
        const data = await response.json();
        alert(data.message);
      } else {
        alert('Failed to retrieve visa details.');
      }
    } catch (error) {
      console.error('Error fetching visa details:', error);
      alert('An error occurred while fetching visa details.');
    }
  };

  return (
    <div style={styles.container}>
      <h1>Visa Checker</h1>
      <input
        type="text"
        placeholder="Passport Number"
        value={passportNo}
        onChange={(e) => setPassportNo(e.target.value)}
        style={styles.input}
      />
      <input
        type="date"
        placeholder="Date of Birth"
        value={dob}
        onChange={(e) => setDob(e.target.value)}
        style={styles.input}
      />
      <button onClick={handleCheckVisa} style={styles.button}>
        Check Visa
      </button>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#f0f4f8', 
  },
  input: {
    padding: '10px',
    margin: '10px 0',
    width: '300px',
    fontSize: '16px',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#007BFF', 
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
    marginTop: '10px',
  },
  buttonHover: {
    backgroundColor: '#0056b3', 
  },
};
