import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
const SERVER = process.env.REACT_APP_SERVER_URL;

export const Home = () => {
  const [users, setUsers] = useState([]);


  useEffect(()=>{
    getUserData();
  },[]);

  const getUserData = async () => {
    fetch(`${SERVER}/users`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(data => setUsers(data));    
  }


  const handleDelete = (id) => {
    fetch(`${SERVER}/user/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(alert("User deleted successfully"))
    .then(getUserData());
  }

  return (
    <>
      <div className='container'>
        <div className='py-4'>
          <table className="table border shadow rounded">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Username</th>
                <th scope="col">Email</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {
                users.map((user, index)=> {
                  return (
                    <tr>
                      <th>{ index+1 }</th>
                      <td>{ user.name }</td>
                      <td>{ user.username }</td>
                      <td>{ user.email }</td>
                      <td>
                        {/* <button className='btn btn-primary mx-2'>View</button> */}
                        <Link to={ `/edit/user/${user.id}` } className='btn btn-primary mx-2'>Edit</Link>
                        <button className='btn btn-danger mx-2' onClick={ ()=> handleDelete(user.id) }>Delete</button>
                      </td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}
