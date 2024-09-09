
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { notification } from 'antd';
import Header from '../includes/header'
import Footer from '../includes/footer'
import Sidebar from '../includes/sidebar'
function dasboard() {
  const [genreCount, setGenreCount] = useState(0);
  const [seriesCount, setSeriesCount] = useState(0);
  const [seasonCount, setSeasonCount] = useState(0);
  useEffect(() => {
    //count genre
    const fetchGenreCount = () => {
      const token = localStorage.getItem('token');
      axios.get('http://localhost:1234/genres-count', {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      })
      .then(response => {
        setGenreCount(response.data.data);
      })
      .catch(error => {
        notification.error({
          message: 'Failed',
          description: 'Failed to fetch genre count',
          duration: 3,
        });
      });
    };
    //count series
    const fetchSeriesCount = () => {
      const token = localStorage.getItem('token');

      axios.get('http://localhost:1234/series-count', {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      })
      .then(response => {
        setSeriesCount(response.data.data);
      })
      .catch(error => {
        notification.error({
          message: 'Failed',
          description: 'Failed to fetch series count',
          duration: 3,
        });
      });
    };
//count season
const fetchSeasonCount = () => {
  const token = localStorage.getItem('token');

  axios.get('http://localhost:1234/season-count', {
    headers: {
      Authorization: `Bearer ${token}`, 
    },
  })
  .then(response => {
    setSeasonCount(response.data.data);
  })
  .catch(error => {
    notification.error({
      message: 'Failed',
      description: 'Failed to fetch season count',
      duration: 3,
    });
  });
};
    fetchGenreCount();
    fetchSeriesCount();
    fetchSeasonCount();
  }, []);
  return (
<>
<Header/>
<Sidebar/>
<main id="main" className="main">
  <div className="pagetitle">
    <h1>Dashboard</h1>
    <nav>
      <ol className="breadcrumb">
        <li className="breadcrumb-item"><a href="index.html">Home</a></li>
        <li className="breadcrumb-item active">Dashboard</li>
      </ol>
    </nav>
  </div>{/* End Page Title */}
  <section className="section dashboard mt-4">
    <div className="row">
      {/* Left side columns */}
      <div className="col-lg-12">
        <div className="row">
        <div className="col-xxl-4 col-md-4">
            <div className="card info-card sales-card">
              <div className="filter">
                <a className="icon" href="#" data-bs-toggle="dropdown"><i className="bi bi-three-dots" /></a>
                <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                  <li className="dropdown-header text-start">
                    <h6>Filter</h6>
                  </li>
                  <li><a className="dropdown-item" href="#">Today</a></li>
                  <li><a className="dropdown-item" href="#">This Month</a></li>
                  <li><a className="dropdown-item" href="#">This Year</a></li>
                </ul>
              </div>
              <div className="card-body">
                <h5 className="card-title">Genres <span>| Today</span></h5>
                <div className="d-flex align-items-center">
                  <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                  <i className="bi bi-grid" />
                  </div>
                  <div className="ps-3">
                    <h6>{genreCount}</h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
  
        <div className="col-xxl-4 col-md-4">
            <div className="card info-card sales-card">
              <div className="filter">
                <a className="icon" href="#" data-bs-toggle="dropdown"><i className="bi bi-three-dots" /></a>
                <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                  <li className="dropdown-header text-start">
                    <h6>Filter</h6>
                  </li>
                  <li><a className="dropdown-item" href="#">Today</a></li>
                  <li><a className="dropdown-item" href="#">This Month</a></li>
                  <li><a className="dropdown-item" href="#">This Year</a></li>
                </ul>
              </div>
              <div className="card-body">
                <h5 className="card-title">Series <span>| Today</span></h5>
                <div className="d-flex align-items-center">
                  <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                  <i className="bi bi-grid" />
                  </div>
                  <div className="ps-3">
                    <h6>{seriesCount}</h6>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-xxl-4 col-md-4">
            <div className="card info-card sales-card">
              <div className="filter">
                <a className="icon" href="#" data-bs-toggle="dropdown"><i className="bi bi-three-dots" /></a>
                <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                  <li className="dropdown-header text-start">
                    <h6>Filter</h6>
                  </li>
                  <li><a className="dropdown-item" href="#">Today</a></li>
                  <li><a className="dropdown-item" href="#">This Month</a></li>
                  <li><a className="dropdown-item" href="#">This Year</a></li>
                </ul>
              </div>
              <div className="card-body">
                <h5 className="card-title">Season <span>| Today</span></h5>
                <div className="d-flex align-items-center">
                  <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                  <i className="bi bi-grid" />
                  </div>
                  <div className="ps-3">
                    <h6>{seasonCount}</h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
        
        </div>
      </div>{/* End Left side columns */}
      {/* Right side columns */}
     
    </div>
  </section>
</main>
<Footer/>
</>
  )
}

export default dasboard