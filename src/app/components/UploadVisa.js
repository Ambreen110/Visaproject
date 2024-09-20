function UploadForm() {
  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const formData = new FormData(event.target);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', 
        },
        body: JSON.stringify(Object.fromEntries(formData)), 
      });
      

      const result = await response.json();
      alert(result.message);
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Failed to upload visa details');
    }
  };

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div>
            <h2 className="text-xl font-semibold mb-4">Visa Details (ﺑﻴﺎﻧﺎت اﻟﺘﺄﺷﻴﺮة)</h2>
    
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label htmlFor="visaNumber" className="block text-gray-700">Visa Number</label>
                <input
                  type="text"
                  id="visaNumber"
                  name="visaNumber"
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  required
                />
              </div>
    
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="visaTypeArabic" className="block text-gray-700">Visa Type (Arabic) (ﻧﻮع اﻟﺘﺄﺷﻴﺮة)</label>
                  <input
                    type="text"
                    id="visaTypeArabic"
                    name="visaTypeArabic"
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    required
                  />
                </div>
    
                <div>
                  <label htmlFor="visaTypeEnglish" className="block text-gray-700">Visa Type (English)</label>
                  <input
                    type="text"
                    id="visaTypeEnglish"
                    name="visaTypeEnglish"
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    required
                  />
                </div>
              </div>
    
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="visaPurposeArabic" className="block text-gray-700">Visa Purpose (Arabic) (اﻟﻐﺮض)</label>
                  <input
                    type="text"
                    id="visaPurposeArabic"
                    name="visaPurposeArabic"
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    required
                  />
                </div>
    
                <div>
                  <label htmlFor="visaPurposeEnglish" className="block text-gray-700">Visa Purpose (English)</label>
                  <input
                    type="text"
                    id="visaPurposeEnglish"
                    name="visaPurposeEnglish"
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    required
                  />
                </div>
              </div>
    
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="dateOfIssue" className="block text-gray-700">Date of Issue</label>
                  <input
                    type="date"
                    id="dateOfIssue"
                    name="dateOfIssue"
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    required
                  />
                </div>
    
                <div>
                  <label htmlFor="dateOfExpiry" className="block text-gray-700">Date of Expiry</label>
                  <input
                    type="date"
                    id="dateOfExpiry"
                    name="dateOfExpiry"
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    required
                  />
                </div>
              </div>
    
              <div>
                <label htmlFor="placeOfIssueArabic" className="block text-gray-700">Place of Issue (Arabic)</label>
                <input
                  type="text"
                  id="placeOfIssueArabic"
                  name="placeOfIssueArabic"
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  required
                />
              </div>
            </div>
          </div>
    
          <div>
            <h2 className="text-xl font-semibold mb-4">Visa Holder Details (ﺑﻴﺎﻧﺎت ﺻﺎﺣﺐ اﻟﺘﺄﺷﻴﺮة)</h2>
    
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="fullNameArabic" className="block text-gray-700">Full Name (Arabic)</label>
                <input
                  type="text"
                  id="fullNameArabic"
                  name="fullNameArabic"
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  required
                />
              </div>
    
              <div>
                <label htmlFor="fullNameEnglish" className="block text-gray-700">Full Name (English)</label>
                <input
                  type="text"
                  id="fullNameEnglish"
                  name="fullNameEnglish"
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  required
                />
              </div>
            </div>
    
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="moiReference" className="block text-gray-700">MOI Reference</label>
                <input
                  type="text"
                  id="moiReference"
                  name="moiReference"
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  required
                />
              </div>
    
              <div>
                <label htmlFor="nationality" className="block text-gray-700">Nationality</label>
                <input
                  type="text"
                  id="nationality"
                  name="nationality"
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  required
                />
              </div>
            </div>
    
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="gender" className="block text-gray-700">Gender</label>
                <input
                  type="text"
                  id="gender"
                  name="gender"
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  required
                />
              </div>
    
              <div>
                <label htmlFor="occupationArabic" className="block text-gray-700">Occupation (Arabic)</label>
                <input
                  type="text"
                  id="occupationArabic"
                  name="occupationArabic"
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  required
                />
              </div>
            </div>
    
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="occupationEnglish" className="block text-gray-700">Occupation (English)</label>
                <input
                  type="text"
                  id="occupationEnglish"
                  name="occupationEnglish"
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  required
                />
              </div>
    
              <div>
                <label htmlFor="dob" className="block text-gray-700">Date of Birth</label>
                <input
                  type="date"
                  id="dob"
                  name="dob"
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  required
                />
              </div>
            </div>
    
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="passportNo" className="block text-gray-700">Passport Number</label>
                <input
                  type="text"
                  id="passportNo"
                  name="passportNo"
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  required
                />
              </div>
    
              <div>
                <label htmlFor="passportExpiry" className="block text-gray-700">Passport Expiry</label>
                <input
                  type="date"
                  id="passportExpiry"
                  name="passportExpiry"
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  required
                />
              </div>
            </div>
    
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="entryDate" className="block text-gray-700">Date of Entry</label>
                <input
                  type="date"
                  id="entryDate"
                  name="entryDate"
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  required
                />
              </div>
    
              <div>
                <label htmlFor="departureDate" className="block text-gray-700">Date of Departure</label>
                <input
                  type="date"
                  id="departureDate"
                  name="departureDate"
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  required
                />
              </div>
            </div>
          </div>
    
       
    
          <button type="submit" className="mt-4 bg-blue-500 text-white py-2 px-4 rounded">
            Submit
          </button>
        </form>
      );
    }
    
    export default UploadForm;
    