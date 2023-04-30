import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Navbar = ({ user, onLogout }) => {
    let navigate=useNavigate();
    const handleLogout = () => {
        axios.post('http://127.0.0.1:8000/api/logout', null, {
            headers: {
                Authorization: `Bearer ${window.sessionStorage.getItem("auth_token")}`,
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        })
        .then(response => {
            onLogout();
            navigate("/");
        })
        .catch(error => console.error(error));
    };
    

  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand">E-pijaca</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">

            {user && user.role=='admin' && (
                <><li className="nav-item">
                    <NavLink to="/admin" className="nav-link" activeClassName="active">AdminDashboard</NavLink>
                    

                </li>
                <li className="nav-item">
                <   NavLink to="/admin/products" className="nav-link" activeClassName="active">Proizvodi</NavLink>            

                </li>
                <li className="nav-item">
                <   NavLink to="/admin/products/add" className="nav-link" activeClassName="active">Dodaj</NavLink>            

                </li>
                
                </>


            )}

            { user &&  user.role!='admin' &&

                (<><li className="nav-item">
                <NavLink to="/" className="nav-link" activeClassName="active" end>Home</NavLink>
                </li>
                <li className="nav-item">
                <NavLink to="/proizvodi" className="nav-link" activeClassName="active">Proizvodi</NavLink>
                </li>
                <li className="nav-item">
                <NavLink to="/preporuke" className="nav-link" activeClassName="active" end>Nase preporuke</NavLink>
                </li>
                
                
                
                </>)

            }
          </ul>
          <ul className="navbar-nav">
            {user ? (
              <>

                <li className="nav-item">
                  <span className="nav-link">Dobrodošli, {user.username}</span>
                </li>
                <li className="nav-item">
                  <button className="btn btn-outline-primary" onClick={handleLogout}>Logout</button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <NavLink to="/login" className="nav-link" activeClassName="active">Login</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/register" className="nav-link" activeClassName="active">Register</NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
