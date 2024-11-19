import React, { useState } from 'react';
import { get } from '../services/ApiEndpoint';
import { toast } from 'react-hot-toast';
import Navbar from '../Components/Navbar/Navbar';

const FileByPublishedDate = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [files, setFiles] = useState([]);

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };
 
  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

  const fetchFilesByPublishedDateRange = async () => {
    if (!startDate || !endDate) {
      toast.error('Start date and end date are required');
      return;
    }
  
    console.log("Fetching files from:", startDate, "to:", endDate);
  
    try {
      const response = await get(`/api/admin/filesByPublishedDate?startDate=${startDate}&endDate=${endDate}`);
      
      if (response.status === 200) {
        setFiles(response.data.files);
        toast.success('Files fetched successfully');
      }
    } catch (error) {
      console.error('Error fetching files:', error.response.data.message);
      toast.error('Error fetching files: ' + error.response.data.message);
    }
  };
  

  return (
    <>
      <Navbar />
      <div className="admin-container">
        <h2>Manage Files by Published Date Range</h2>
        <div>
          <label>Start Date: </label>
          <input
            type="date"
            value={startDate}
            onChange={handleStartDateChange}
          />
          <label>End Date: </label>
          <input
            type="date"
            value={endDate}
            onChange={handleEndDateChange}
          />
          <button onClick={fetchFilesByPublishedDateRange}>Fetch Files</button>
        </div>
        <table>
          <thead>
            <tr>
              <th>Email</th>
              <th>File Path</th>
              <th>File Exists</th>
              <th>Download</th>
            </tr>
          </thead>
          <tbody>
            {files.map((file, index) => (
              <tr key={index}>
                <td>{file.email}</td>
                <td>{file.filePath || 'N/A'}</td>
                <td>{file.fileExists ? 'Yes' : 'No'}</td>
                <td>
                  {file.fileExists && file.filePath ? (
                    <a
                      href={`http://localhost:4001/uploads${file.filePath.replace('file/', '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Download
                    </a>
                  ) : (
                    <span>No file available</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default FileByPublishedDate;
