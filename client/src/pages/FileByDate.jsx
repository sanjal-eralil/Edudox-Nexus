import React, { useState } from 'react';
import { get } from '../services/ApiEndpoint';
import { toast } from 'react-hot-toast';
import Navbar from '../Components/Navbar/Navbar';

const FileByDate= () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [files, setFiles] = useState([]);

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

  const fetchFilesByDateRange = async () => {
    try {
      const response = await get(`/api/admin/files?startDate=${startDate}&endDate=${endDate}`);
      if (response.status === 200) {
        setFiles(response.data.files);
        toast.success('Files fetched successfully');
      }
    } catch (error) {
      toast.error('Error fetching files');
      console.error(error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="admin-container">
        <h2>Manage Files by Date Range</h2>
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
          <button onClick={fetchFilesByDateRange}>Fetch Files</button>
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

export default FileByDate;

/*
import React, { useState } from 'react';
import { get } from '../services/ApiEndpoint';
import { toast } from 'react-hot-toast';
import Navbar from '../Components/Navbar/Navbar';

const FileByDate = () => {
  const [date, setDate] = useState('');
  const [files, setFiles] = useState([]);

  const handleDateChange = (event) => {
    setDate(event.target.value);
  };

  const fetchFilesByDate = async () => {
    try {
      const response = await get(`/api/admin/files?date=${date}`);
      if (response.status === 200) {
        setFiles(response.data.files);
        toast.success('Files fetched successfully');
      }
    } catch (error) {
      toast.error('Error fetching files');
      console.error(error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="admin-container">
        <h2>Manage Files by Date</h2>
        <input
          type="date"
          value={date}
          onChange={handleDateChange}
        />
        <button onClick={fetchFilesByDate}>Fetch Files</button>
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

export default FileByDate;
*/

/*
import React, { useState } from 'react';
import { get } from '../services/ApiEndpoint';
import { toast } from 'react-hot-toast';
import Navbar from '../Components/Navbar/Navbar';

const  FileByDate=()=>{
  const [date, setDate] = useState('');
  const [files, setFiles] = useState([]);

  const handleDateChange = (event) => {
    setDate(event.target.value);
  };

  const fetchFilesByDate = async () => {
    try {
      const response = await get(`/api/admin/files?date=${date}`);
      if (response.status === 200) {
        setFiles(response.data.files);
        toast.success('Files fetched successfully');
      }
    } catch (error) {
      toast.error('Error fetching files');
      console.error(error);
    }
  };

  return (
    <>
    <Navbar/>
      <div className="admin-container">
        <h2>Manage Files by Date</h2>
        <input
          type="date"
          value={date}
          onChange={handleDateChange}
        />
        <button onClick={fetchFilesByDate}>Fetch Files</button>
        <table>
          <thead>
            <tr>
              <th>Email</th>
              <th>File Path</th>
              <th>File Exists</th>
            </tr>
          </thead>
          <tbody>
            {files.map((file, index) => (
              <tr key={index}>
                <td>{file.email}</td>
                <td>{file.filePath || 'N/A'}</td>
                <td>{file.fileExists ? 'Yes' : 'No'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}


export default FileByDate;
*/