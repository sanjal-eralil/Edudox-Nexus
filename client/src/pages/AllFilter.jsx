import React, { useState } from 'react';
import { get } from '../services/ApiEndpoint';
import Navbar from '../Components/Navbar/Navbar';

const AllFilter = () => {
  const [email, setEmail] = useState('');
  const [mainOption, setMainOption] = useState('');
  const [subOption, setSubOption] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [filteredFiles, setFilteredFiles] = useState([]);
  const [error, setError] = useState('');

  const subOptions = {
    Journal: ['Q1', 'Q2', 'Q3', 'Q4'],
    Patent: ['Granted', 'Not Granted'],
  };

  const handleOptionChange = (e) => {
    setMainOption(e.target.value);
    setSubOption('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setFilteredFiles([]);

    try {
      const response = await get(`/api/admin/allfilter`, {
        params: {
          email,
          mainOption,
          subOption,
          startDate,
          endDate,
        },
      });

      setFilteredFiles(response.data.files);
    } catch (err) {
      setError('Error fetching files');
      console.error(err);
    }
  };

  return (
    <>
        <Navbar/>
  
    <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
      <div
        style={{
          maxWidth: '600px',
          width: '100%',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          backgroundColor: '#fff',
        }}
      >
        <h1 style={{ color: 'red', textAlign: 'center' }}>Filter Files</h1>
        <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
          <div style={{ marginBottom: '10px' }}>
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ width: '100%', padding: '8px', borderRadius: '5px', marginTop: '5px' }}
            />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label>Main Option:</label>
            <select
              onChange={handleOptionChange}
              value={mainOption}
              style={{ width: '100%', padding: '8px', borderRadius: '5px', marginTop: '5px' }}
            >
              <option value="">--Choose an option--</option>
              <option value="Journal">Journal</option>
              <option value="Patent">Patent</option>
            </select>
          </div>
          {mainOption && (
            <div style={{ marginBottom: '10px' }}>
              <label>Sub Option:</label>
              <select
                onChange={(e) => setSubOption(e.target.value)}
                value={subOption}
                style={{ width: '100%', padding: '8px', borderRadius: '5px', marginTop: '5px' }}
              >
                <option value="">--Choose a sub-option--</option>
                {subOptions[mainOption].map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          )}
          <div style={{ marginBottom: '10px' }}>
            <label>Start Date:</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              style={{ width: '100%', padding: '8px', borderRadius: '5px', marginTop: '5px' }}
            />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label>End Date:</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              style={{ width: '100%', padding: '8px', borderRadius: '5px', marginTop: '5px' }}
            />
          </div>
          <button
            type="submit"
            style={{
              width: '100%',
              padding: '10px',
              backgroundColor: '#007bff',
              color: '#fff',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            Filter
          </button>
        </form>

        {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}

        {filteredFiles.length > 0 && (
          <div>
            <h2 style={{ textAlign: 'center', color: '#333' }}>Filtered Files</h2>
            <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
              <thead>
                <tr style={{ backgroundColor: '#f8d7da', color: '#721c24' }}>
                  <th>Email</th>
                  <th>Main Option</th>
                  <th>Sub Option</th>
                  <th>Published Date</th>
                  <th>Approved</th>
                  <th>Download</th>
                </tr>
              </thead>
              <tbody>
                {filteredFiles.map((file, index) => (
                  <tr key={index} style={{ borderBottom: '1px solid #ddd' }}>
                    <td>{file.email}</td>
                    <td>{file.mainOption}</td>
                    <td>{file.subOption}</td>
                    <td>{file.publishedDate}</td>
                    <td>{file.approved}</td>
                    <td>
                      {file.filePath ? (
                        <a href={file.filePath} download>
                          Download
                        </a>
                      ) : (
                        'No file'
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
    </>
  );
};

export default AllFilter;
