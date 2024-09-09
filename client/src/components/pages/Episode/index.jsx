import React, { useEffect, useState } from 'react';
import { notification } from 'antd';
import { Link } from 'react-router-dom';
import Header from '../../includes/header';
import Sidebar from '../../includes/sidebar';
import Footer from '../../includes/footer';
import axios from 'axios';

function Index() {
  const [episodes, setEpisodes] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get('http://localhost:1234/episodes', {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    })
      .then(response => {
        setEpisodes(response.data.data); 
      })
      .catch(error => {
        notification.error({
          message: 'Failed',
          description: 'Failed to Fetch Episode',error,
          duration:3
        });
      });
  }, []);

  // Delete episode by ID
  const handleDelete = (id) => {
    const token = localStorage.getItem('token');
    axios.delete(`http://localhost:1234/episodes/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    })
      .then(() => {
        setEpisodes(episodes.filter(episode => episode._id !== id));
        notification.success({
          message: 'Success',
          description: "Episode Deleted Successfully",
          duration:3
        });
      })
      .catch(error => {
        notification.error({
          message: 'Failed',
          description: 'Failed to Delete Episode',error,
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
          <h1>Episode Detail</h1>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">Dashboard</li>
              <li className="breadcrumb-item">Episode</li>
              <li className="breadcrumb-item active">Detail</li>
            </ol>
          </nav>
        </div>
        <div className="d-flex justify-content-end mb-3">
          <Link to="/addepisode" className="btn btn-golden mt-2">
            Add Episode
          </Link>
        </div>
        <section className="section">
          <div className="row">
            <div className="col-lg-12">
              <div className="card">
                <div className="card-body">
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th>No</th>
                        <th>Episode Name</th>
                        <th>Description</th>
                        <th className="text-center">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {episodes.length > 0 ? (
                        episodes.map((episode, index) => (
                          <tr key={episode._id}>
                            <td>{index + 1}</td>
                            <td>{episode.name}</td>
                            <td>{episode.description}</td>
                            <td className="text-center">
                            <Link to={`/editepisode/${episode._id}`} className="btn btn-sm btn-golden">
                                  <i className="fa-solid fa-pen-to-square"></i>
                                </Link>
                               <button
                                  className="btn btn-sm btn-golden ms-2"
                                  onClick={() => handleDelete(episode._id)}
                                >
                                  <i className="fa-solid fa-trash"></i>
                                </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="6" className="text-center">No episodes found</td>
                        </tr>
                      )}
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
