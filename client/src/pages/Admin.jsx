import React, { useEffect, useState } from 'react'
import {  deleteUser, get } from '../services/ApiEndpoint'
import  { toast } from 'react-hot-toast';
import Navbar from '../Components/Navbar/Navbar';
import { useNavigate } from 'react-router-dom';
export default function Admin() {
  const [users,setUsers]=useState('')
 const navigate=useNavigate();

  useEffect(()=>{
         const GetUsers=async()=>{
          try {
                 const request= await get('/api/admin/getuser')
                 const respnse = request.data
                if (request.status===200) {
                   setUsers(respnse.users)
                }
                 
          } catch (error) {
              console.log(error)
          }
         }
         GetUsers()
  },[])
  const handleUser = async (email, name) => {
    const userData = { email, name };
    navigate('/admin/user', { state: userData });
  };
  const handleDate=async()=>{
    navigate('/admin/getfilesbydate');
  }
  const handleEmail=async()=>{
    navigate('/admin/getemailanddate');
  }
  const handleFiles=async()=>{
    navigate('/admin/getfiles');
  }

  const handleFilter=async()=>{
    navigate('/admin/allfilter');
  }

  const handleCategory=async()=>{
    navigate('/admin/category');
  }
  const handleDelet=async(id)=>{
       try {
            const request=await deleteUser(`/api/admin/delet/${id}`)
            const response=request.data
            if (request.status===200) {
              toast.success(response.message)
              console.log(response)
            }
       } catch (error) {
          if (error.response) {
            toast.error(error.response.data.message)
          }
       }
  }
  return (
    <>
    <Navbar/>
       <div className='admin-container'>
       <h1 style={{alignItems:'center'}}>Welcome Admin</h1>
       <div style={{display:'flex'}}>
       <button style={{margin:'20px'}} className="my-button" onClick={()=>handleFiles()}>View Files</button>
       <button style={{margin:'20px'}} className="my-button" onClick={()=>handleDate()}>Filter By Date</button>
       <button style={{margin:'20px'}} className="my-button" onClick={()=>handleEmail()}>Filter By Email</button>
       <button style={{margin:'20px'}} className="my-button" onClick={()=>handleCategory()}>Filter By Category</button>
       <button style={{margin:'20px'}} className="my-button" onClick={()=>handleFilter()}>All Filter</button>

       </div>
       </div>
      <div className='admin-container'>
        <h2>Mange Users</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>View</th>
              <th>Delete</th>
            </tr>
          </thead>
            <tbody>
            {users && users.map((elem,index)=>{
              return(
                <tr key={index}>
                <td>{elem.name}</td>
                <td>{elem.email}</td>
                <td  >
                  <button className="my-button" onClick={()=>handleUser(elem.email,elem.name)}>View</button>
                </td>
                <td>
                  <button    onClick={()=>handleDelet(elem._id)}>Delete</button>
                </td>
              </tr>
              )
            })}
              
            </tbody>
        </table>
      </div>
    </>
  )
}
