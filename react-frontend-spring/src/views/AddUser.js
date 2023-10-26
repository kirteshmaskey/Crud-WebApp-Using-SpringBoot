import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
const SERVER = process.env.REACT_APP_SERVER_URL;

export const AddUser = () => {
  const navigate = useNavigate();
  const [newUser, setNewUser] = useState({
    name: "",
    username: "",
    email: ""
  });

  const setValue = (e) => {
    // console.log(e.target.value);
    const {name, value} = e.target;
    // console.log(name + " " + value);
    setNewUser({
      ...newUser,
      [name]: value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    
    if(newUser.name === "") {
      alert("Name is required");
    }else if(newUser.username === "") {
      alert("Username is required");
    }else if(!newUser.email.includes('@')) {
      alert("Email is invalid");
    }else if(newUser.email === "") {
      alert("Email is required");
    }else {
      await fetch(`${SERVER}/user`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: newUser.name,
          username: newUser.username,
          email: newUser.email
        }
      )})
      .then(alert("User details added successfully"))
      .then(navigate("/"))
      .catch(err => alert("Cannot add details"));
    }
  };
  
  const handleClear = (e) => {
    e.preventDefault();
    setNewUser({
      name: "",
      username: "",
      email: ""
    });
  };


  return (
    <>
    <div className='container mt-3'>
      <div className='row'>
        <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
          <h2 className='text-center'>Add new user</h2>

          <form method=''>
            <div className='mt-5 mb-3'>
              <input type='text' name='name' placeholder='Enter your Name' value={newUser.name} onChange={ (e)=>setValue(e) } className='form-control my-3'></input>
              <input type='text' name='username' placeholder='Enter your username' value={newUser.username} onChange={ (e)=>setValue(e) } className='form-control my-3'></input>
              <input type='text' name='email' placeholder='Enter your Email' value={newUser.email} onChange={ (e)=>setValue(e) } className='form-control my-3'></input>
            </div>
            <div className='mt-5'>
              <Link to="/" className='btn btn-outline-primary mx-2'>Go Back</Link>
              <button type='submit' className='btn btn-success mx-2' onClick={ (e)=> handleSubmit(e) }>Submit</button>
              <button type='' className='btn btn-outline-primary mx-2' onClick={ (e) => handleClear(e) }>Clear</button>
            </div>
          </form>
        </div>
      </div>
    </div>
    </>
  )
}
