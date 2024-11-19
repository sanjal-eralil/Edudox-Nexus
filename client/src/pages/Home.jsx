import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { post } from '../services/ApiEndpoint'
import { Logout } from '../redux/AuthSlice'
import { useEffect,useState } from 'react'
import axios from 'axios';
import Navbar from '../Components/Navbar/Navbar'

export default function Home() {
  const user=useSelector((state)=>state.Auth.user)
  console.log(user)
  const navigate=useNavigate()
  const disptach=useDispatch()
  const gotoAdmin=()=>{
        navigate('/admin')
  }
  const handleLogout=async()=>{
    try {
      const request= await post('/api/auth/logout')
       const respone= request.data
       if (request.status==200) {
           disptach(Logout())
          navigate('/login')
       }
    } catch (error) {
      console.log(error)
    }
  }

  const [email, setEmail] = useState("");
  const [mainOption, setMainOption] = useState("");
  const [subOption, setSubOption] = useState("");
  const [publishedDate, setPublishedDate] = useState("");
  const [file, setFile] = useState(null);

  const subOptions = {
    Journal: ["Q1", "Q2", "Q3", "Q4"],
    Patent: ["Granted", "Not Granted"],
  };

  const handleOptionChange = (e) => {
    setMainOption(e.target.value);
    setSubOption(""); // Reset sub-option when main option changes
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Construct form data
    const formData = new FormData();
    formData.append("email", email);
    formData.append("mainOption", mainOption);
    formData.append("subOption", subOption);
    formData.append("publishedDate", publishedDate);
    formData.append("file", file);

    try {
      const response = await axios.post('http://localhost:4001/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('File upload success:', response.data);
      alert("success");
      // Optionally, refresh the user list or handle success state here
    } catch (error) {
      console.error('File upload error:', error);
      // Handle the error state here
    }
  };

  

  return (
    <>
    <Navbar/>

     <div className='home-container'>
      <div className='user-card'>
        <h2> Welcome,{user && user.name}</h2>



        <div style={{ display: "flex", justifyContent: "center", padding: "20px" }}>
      <div
        style={{
          maxWidth: "600px",
          width: "100%",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          backgroundColor: "#fff",
        }}
      >
        <h1 style={{ color: "red", textAlign: "center" }}>Submit File</h1>
        <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
          <div style={{ marginBottom: "10px" }}>
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: "100%",
                padding: "8px",
                borderRadius: "5px",
                marginTop: "5px",
              }}
              required
            />
          </div>
          <div style={{ marginBottom: "10px" }}>
            <label>Main Option:</label>
            <select
              onChange={handleOptionChange}
              value={mainOption}
              style={{
                width: "100%",
                padding: "8px",
                borderRadius: "5px",
                marginTop: "5px",
              }}
              required
            >
              <option value="">--Choose an option--</option>
              <option value="Journal">Journal</option>
              <option value="Patent">Patent</option>
            </select>
          </div>
          {mainOption && (
            <div style={{ marginBottom: "10px" }}>
              <label>Sub Option:</label>
              <select
                onChange={(e) => setSubOption(e.target.value)}
                value={subOption}
                style={{
                  width: "100%",
                  padding: "8px",
                  borderRadius: "5px",
                  marginTop: "5px",
                }}
                required
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
          <div style={{ marginBottom: "10px" }}>
            <label>Published Date:</label>
            <input
              type="date"
              value={publishedDate}
              onChange={(e) => setPublishedDate(e.target.value)}
              style={{
                width: "100%",
                padding: "8px",
                borderRadius: "5px",
                marginTop: "5px",
              }}
              required
            />
          </div>
          <div style={{ marginBottom: "10px" }}>
            <label>File:</label>
            <input
              type="file"
              onChange={handleFileChange}
              style={{
                width: "100%",
                padding: "8px",
                marginTop: "5px",
              }}
              required
            />
          </div>
          <button
            type="submit"
            style={{
              width: "100%",
              padding: "10px",
              backgroundColor: "#007bff",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Submit
          </button>
        </form>
      </div>
    </div>



        <button className='logout-btn' onClick={handleLogout}>Logout</button>
        {user && user.role=='admin' ? <button className='admin-btn' onClick={gotoAdmin}>Go To admin</button> :''}
        
      </div>
     </div>



    </>
  )
}
