import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-success">
        <div className="container-fluid">
          <Link to='/' className="navbar-brand">CRUD APPLICATION</Link>
          <Link to='/add/user' className="btn btn-outline-light">Add User</Link>
        </div>
      </nav>
    </>
  );
};
