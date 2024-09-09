import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../includes/header';
import Sidebar from '../../includes/sidebar';
import Footer from '../../includes/footer';
import axios from 'axios';
import { message, notification } from 'antd';

function Index() {
  const [genres, setGenres] = useState([]);
  const fetchAllGenre = () => {
    const token = localStorage.getItem('token');
  
    axios.get('http://localhost:1234/genres', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
    .then((res) => {
      setGenres(res.data.data);
    })
    .catch((error) => {
      notification.error({ message: 'Failed to fetch genres:',error });
    });
  };

  useEffect(() => {
    fetchAllGenre();
  }, []);

  // Handle genre deletion
  const handleDelete = (id) => {
    const token = localStorage.getItem('token');
    
    axios.delete(`http://localhost:1234/genres/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
    .then(() => {
      notification.success({
        message: 'Success',
        description: 'Genre Deleted Successfully',
        duration: 3
    });
      fetchAllGenre();
    })
    .catch((error) => {
      notification.error({
        message: 'Failed',
        description: 'Failed to Deleted Genre', error,
        duration: 3
    });
    });
  };

  return (
    <>
      <Header />
      <Sidebar />
      <main id="main" className="main">
        <div className="pagetitle">
          <h1>Genre Detaill</h1>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">Dashboard</li>
              <li className="breadcrumb-item">Genre</li>
              <li className="breadcrumb-item active">Detail</li>
            </ol>
          </nav>
        </div>
        <div className="d-flex justify-content-end mb-3">
          <Link to="/addgenre" className="btn btn-golden mt-2">
            Add Genre
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
                        <th>Genre</th>
                        <th className='text-center'>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {genres.length > 0 ? (
                        genres.map((genre, index) => (
                          <tr key={genre._id}>
                            <td>{index + 1}</td>
                            <td>{genre.name}</td>
                            <td className='text-center'>
                              <Link to={`/editgenre/${genre._id}`} className="btn btn-sm btn-golden">
                                <i className="fa-solid fa-pen-to-square"></i>
                              </Link>
                              <button
                                onClick={() => handleDelete(genre._id)}
                                className="btn btn-sm btn-golden ms-2"
                              >
                                <i className="fa-solid fa-trash"></i>
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="3" className='text-center'>No genres available</td>
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
