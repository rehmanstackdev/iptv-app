import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { notification } from 'antd';
import axios from 'axios';
import Header from '../../includes/header';
import Sidebar from '../../includes/sidebar';
import Footer from '../../includes/footer';

function Index() {
  const [seasons, setSeasons] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    axios.get('http://localhost:1234/seasons', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(response => {
      setSeasons(response.data.data);
    })
    .catch(error => {
      console.error('Error fetching seasons:', error.response || error.message);
    });
  }, [token]);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:1234/seasons/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(response => {
      setSeasons(seasons.filter(season => season._id !== id));
      notification.success({ 
        message: 'Success',
        description: 'Season Deleted Successfully',
        duration:3
       });

    })
    .catch(error => {
      notification.error({ 
        message: 'Failed',
        description: 'Failed to Delete Season', error,
        duration:3
       });
    });
  };

  return (
    <>
      <Header />
      <Sidebar />
      <main id="main" className="main">
        <div className="pagetitle">
          <h1>Season Detail</h1>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">Dashbord</li>
              <li className="breadcrumb-item">Season</li>
              <li className="breadcrumb-item active">Detail</li>
            </ol>
          </nav>
        </div>
        <div className="d-flex justify-content-end mb-3">
          <Link to="/addseason" className="btn btn-golden mt-2">
            Add Season
          </Link>
        </div>
        <section className="section">
          <div className="row">
            <div className="col-lg-12">
              <div className="card">
                <div className="card-body">
                  <table className="table datatable">
                    <thead>
                      <tr>
                        <th>No</th>
                        <th>Season Name</th>
                        <th>Description</th>
                        <th className='text-center'>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {seasons.map((season, index) => (
                        <tr key={season._id}>
                          <td>{index + 1}</td>
                          <td>{season.name}</td>
                          <td>{season.description}</td>
                          <td className='text-center'>
                          <Link to={`/editseason/${season._id}`} className="btn btn-sm btn-golden">
                           < i className="fa-solid fa-pen-to-square"></i>
                            </Link>
                            <button
                              className="btn btn-sm btn-golden ms-2"
                              onClick={() => handleDelete(season._id)}
                            >
                              <i className="fa-solid fa-trash"></i>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default Index;
