import React from 'react'
import { useNavigate } from 'react-router-dom';
import { notification } from 'antd';
function header() {
  const navigate = useNavigate();

  const handleLogout = () => {
      localStorage.removeItem('token');
      notification.success({
        message: 'Success',
        description: 'User Logout successfully',
        duration: 3
    });
      navigate('/');
  };
  return (

<header id="header" className="header fixed-top d-flex align-items-center bg-pink">
  <div className="d-flex align-items-center justify-content-between">
    <a href="index.html" className="logo d-flex align-items-center">
      <span className="d-none d-lg-block">Movie App</span>
    </a>
    <i className="bi bi-list toggle-sidebar-btn" />
  </div>{/* End Logo */}
  <div className="search-bar">
    <form className="search-form d-flex align-items-center" method="POST" action="#">
      <input type="text" name="query" placeholder="Search" title="Enter search keyword" />
      <button type="submit" title="Search"><i className="bi bi-search" /></button>
    </form>
  </div>{/* End Search Bar */}
  <nav className="header-nav ms-auto">
    <ul className="d-flex align-items-center">
      <li className="nav-item d-block d-lg-none">
        <a className="nav-link nav-icon search-bar-toggle " href="#">
          <i className="bi bi-search" />
        </a>
      </li>{/* End Search Icon*/}
      <button onClick={handleLogout} className="btn btn-primary me-4">Logout</button>
    </ul>
  </nav>{/* End Icons Navigation */}
</header>


  )
}

export default header