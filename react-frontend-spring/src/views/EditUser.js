import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
const SERVER = process.env.REACT_APP_SERVER_URL;

export const EditUser = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [editedUser, setEditedUser] = useState({
    name: "",
    username: "",
    email: ""
  });

  const setValue = (e) => {
    // console.log(e.target.value);
    const {name, value} = e.target;
    // console.log(name + " " + value);
    setEditedUser({
      ...editedUser,
      [name]: value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    
    if(editedUser.name === "") {
      alert("Name is required");
    }else if(editedUser.username === "") {
      alert("Username is required");
    }else if(!editedUser.email.includes('@')) {
      alert("Email is invalid");
    }else if(editedUser.email === "") {
      alert("Email is required");
    }else {
      await fetch(`${SERVER}/user/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: editedUser.name,
          username: editedUser.username,
          email: editedUser.email
        }
      )})
      .then(alert("User details updated successfully"))
      .then(navigate("/"))
      .catch(err => alert("Cannot update details"));
    }
  };
  
  const loadUser = async () => {
    await fetch(`${SERVER}/user/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.json())
    .then(data => setEditedUser(data));
  };

  useEffect(()=> {
    loadUser();
  }, []);

  const handleClear = (e) => {
    e.preventDefault();
    setEditedUser({
      ...editedUser,
      name: "",
      username: ""
    });
  };


  return (
    <>
    <div className='container mt-3'>
      <div className='row'>
        <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
          <h2 className='text-center'>Edit user</h2>

          <form method=''>
            <div className='mt-5 mb-3'>
              <input type='text' name='name' placeholder='Enter your Name' value={editedUser.name} onChange={ (e)=>setValue(e) } className='form-control my-3'></input>
              <input type='text' name='username' placeholder='Enter your username' value={editedUser.username} onChange={ (e)=>setValue(e) } className='form-control my-3'></input>
              <input type='text' name='email' value={editedUser.email} className='form-control my-3' disabled></input>
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
