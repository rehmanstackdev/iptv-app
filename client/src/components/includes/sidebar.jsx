import React from 'react'
import { Link } from 'react-router-dom';
function sidebar() {
  return (
<aside id="sidebar" className="sidebar bg-blue">
  <ul className="sidebar-nav" id="sidebar-nav">
    <li className="nav-item">
      <Link className="text-decoration-none text-reset nav-link collapsed" to="/dashboard">
      <i className="bi bi-grid" />
      <span>Dashboard</span>
      </Link>
    </li>
{/* Genre*/}
    <li className="nav-item">
      <Link className="text-decoration-none text-reset nav-link collapsed" to="/genreindex">
    <i className="bi bi-menu-button-wide"/><span>Genre</span>
      </Link>
    </li>
{/* Series*/}
    <li className="nav-item">
      <Link className="text-decoration-none text-reset nav-link collapsed" to="/seriesindex">
    <i className="bi bi-menu-button-wide"/><span>Series</span>
      </Link>
    </li>
{/* Season*/}
    <li className="nav-item">
      <Link className="text-decoration-none text-reset nav-link collapsed" to="/seasonindex">
    <i className="bi bi-menu-button-wide"/><span>Season</span>
      </Link>
    </li>
    {/* Episode*/}
    <li className="nav-item">
      <Link className="text-decoration-none text-reset nav-link collapsed" to="/episodeindex">
    <i className="bi bi-menu-button-wide"/><span>Episode</span>
      </Link>
    </li>
{/* File*/}
    <li className="nav-item">
      <Link className="text-decoration-none text-reset nav-link collapsed" to="/fileindex">
    <i className="bi bi-menu-button-wide"/><span>File</span>
      </Link>
    </li>
    
  </ul>
</aside>

  )
}

export default sidebar