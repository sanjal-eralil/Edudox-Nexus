import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../Components/Navbar/Navbar';
const UserFiles = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch the users and their files
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:4001/api/admin/getall'); // Adjust the URL to your server
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);


  return (
    <>
    <Navbar/>
    <div className='admin-container'>
    
      <h2>User Files</h2>
      
      <table>
        <thead>
          <tr>
            <th>Email</th>
            <th>Approved</th>
            <th>File</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td>{user.email}</td>
              <td>{user.approved}</td>
              <td>
                {user.fileExists && user.filePath ? (
                  // Render the file as an image if it's a png/jpg, otherwise show a download link
                 
                  user.filePath.endsWith('.png') || user.filePath.endsWith('.jpg') ? (
                    <img
                      src={`http://localhost:4001/uploads${user.filePath.replace('file/', '')}`} // Adjust the URL to match your file route
                      alt={user.email}
                      style={{ width: '100px', height: '100px' }}
                    />
                  ) : (
                    <a href={`http://localhost:4001/uploads${user.filePath.replace('file/', '')}`} target="_blank" rel="noopener noreferrer">
                      Download File
                    </a>
                  )
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

export default UserFiles;
