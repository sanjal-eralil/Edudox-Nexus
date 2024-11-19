// Category.jsx
import React, { useState } from 'react';
import { get } from '../services/ApiEndpoint';
import Navbar from '../Components/Navbar/Navbar';

const Category = () => {
  const [email, setEmail] = useState('');
  const [mainOption, setMainOption] = useState('');
  const [subOption, setSubOption] = useState('');
  const [filteredFiles, setFilteredFiles] = useState([]);
  const [error, setError] = useState('');

  const subOptions = {
    Journal: ['Q1', 'Q2', 'Q3', 'Q4'],
    Patent: ['Granted', 'Not Granted'],
  };

  const handleMainOptionChange = (e) => {
    setMainOption(e.target.value);
    setSubOption(''); // Reset subOption when mainOption changes
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setFilteredFiles([]);

    try {
      const response = await get(`/api/admin/category?email=${email}&mainOption=${mainOption}&subOption=${subOption}`);
      setFilteredFiles(response.data.files); // Set the filtered files from the response
    } catch (err) {
      setError('Error fetching files');
      console.error(err);
    }
  };

  return (
    <><Navbar/>
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h1>Filter Files</h1>
      <form onSubmit={handleSubmit} style={{ maxWidth: '500px', textAlign: 'center' }}>
        <div style={{ marginBottom: '10px' }}>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: '100%', padding: '8px', margin: '8px 0' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Select Main Option:</label>
          <select
            onChange={handleMainOptionChange}
            value={mainOption}
            required
            style={{ width: '100%', padding: '8px', margin: '8px 0' }}
          >
            <option value="">--Choose an option--</option>
            <option value="Journal">Journal</option>
            <option value="Patent">Patent</option>
          </select>
        </div>

        {mainOption && (
          <div style={{ marginBottom: '10px' }}>
            <label>Select Sub Option:</label>
            <select
              onChange={(e) => setSubOption(e.target.value)}
              value={subOption}
              required
              style={{ width: '100%', padding: '8px', margin: '8px 0' }}
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

        <button type="submit" style={{ padding: '10px 20px' }}>Filter</button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {filteredFiles.length > 0 && (
        <div style={{ marginTop: '20px', width: '80%' }}>
          <h2>Filtered Files</h2>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead style={{ color: 'blue', }}>
              <tr>
                <th style={{ border: '1px solid #ddd', padding: '8px' }}>Email</th>
                <th style={{ border: '1px solid #ddd', padding: '8px' }}>Main Option</th>
                <th style={{ border: '1px solid #ddd', padding: '8px' }}>Sub Option</th>
                <th style={{ border: '1px solid #ddd', padding: '8px' }}>File</th>
                <th style={{ border: '1px solid #ddd', padding: '8px' }}>Download</th>
              </tr>
            </thead>
            <tbody>
              {filteredFiles.map((file, index) => (
                <tr key={index}>
                  <td style={{ border: '1px solid #ddd', padding: '8px' }}>{file.email}</td>
                  <td style={{ border: '1px solid #ddd', padding: '8px' }}>{file.mainOption}</td>
                  <td style={{ border: '1px solid #ddd', padding: '8px' }}>{file.subOption}</td>
                  <td style={{ border: '1px solid #ddd', padding: '8px' }}>{file.file}</td>
                  <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                    {file.file ? (
                      <a href={`http://localhost:4001/${file.file}`} download target="_blank" rel="noopener noreferrer">
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
    </>
  );
};

export default Category;
