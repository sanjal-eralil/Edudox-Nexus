import React, { useState } from 'react';
import { get } from '../services/ApiEndpoint';
import { toast } from 'react-hot-toast';
import Navbar from '../Components/Navbar/Navbar';

const EmailandDate = () => {
  const [date, setDate] = useState('');
  const [email, setEmail] = useState('');
  const [files, setFiles] = useState([]);

  const handleDateChange = (event) => {
    setDate(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const fetchFilesByDateAndEmail = async () => {
    if (!date || !email) {
      toast.error('Please enter both date and email.');
      return;
    }

    try {
      const response = await get(`/api/admin/email?date=${date}&email=${email}`);
      if (response.status === 200) {
        const filteredFiles = response.data.files.filter(file => file.email === email);
        setFiles(filteredFiles);
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
        <h2>Manage Files by Date and Email</h2>
        <input
          type="date"
          value={date}
          onChange={handleDateChange}
        />
        <input
          type="email"
          value={email}
          onChange={handleEmailChange}
          placeholder="Enter email"
        />
        <button onClick={fetchFilesByDateAndEmail}>Fetch Files</button>
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

export default EmailandDate;
