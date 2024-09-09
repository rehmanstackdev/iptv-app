import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { notification, Modal } from 'antd';
import Header from '../../includes/header';
import Sidebar from '../../includes/sidebar';
import Footer from '../../includes/footer';

function Index() {
  const [seriesList, setSeriesList] = useState([]);
  const [genres, setGenres] = useState([]);
  const [seasons, setSeasons] = useState([]);
  const [modalOpenGenres, setModalOpenGenres] = useState(false);
  const [modalOpenSeasons, setModalOpenSeasons] = useState(false);
  const [selectedSeriesId, setSelectedSeriesId] = useState(null);

  // Fetch all series
  useEffect(() => {
    const fetchSeriesData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:1234/series', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSeriesList(response.data.data);
      } catch (error) {
        notification.error({
          message: 'Failed',
          description: 'Failed to Fetch Series',
          duration: 3,
        });
      }
    };

    fetchSeriesData();
  }, []);

  // Fetch genres for a specific series
  const fetchGenres = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`http://localhost:1234/series/${id}/genres`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setGenres(response.data.data.data);
      setSelectedSeriesId(id);
      setModalOpenGenres(true);
    } catch (error) {
      notification.error({
        message: 'Failed',
        description: 'No Genre Available For this Series',
        duration: 3,
      });
    }
  };

  // Fetch seasons for a specific series
  const fetchSeasons = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`http://localhost:1234/series/${id}/seasons`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSeasons(response.data.data);
      setSelectedSeriesId(id);
      setModalOpenSeasons(true);
    } catch (error) {
      notification.error({
        message: 'Failed',
        description: 'No Season Available For this Series',
        duration: 3,
      });
    }
  };

  // Delete a series by ID
  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:1234/series/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSeriesList(seriesList.filter((series) => series._id !== id));
      notification.success({
        message: 'Series Deleted',
        description: 'Series Deleted Successfully.',
        duration: 3,
      });
    } catch (error) {
      notification.error({
        message: 'Failed',
        description: 'Failed to Delete Series',
        duration: 3,
      });
    }
  };

  // Close modals
  const handleModalCancel = () => {
    setModalOpenGenres(false);
    setModalOpenSeasons(false);
  };

  return (
    <>
      <Header />
      <Sidebar />
      <main id="main" className="main">
        <div className="pagetitle">
          <h1>Series Detail</h1>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">Dashboard</li>
              <li className="breadcrumb-item">Series</li>
              <li className="breadcrumb-item active">Detail</li>
            </ol>
          </nav>
        </div>
        <div className="d-flex justify-content-end mb-3">
          <Link to="/addseries" className="btn btn-golden mt-2">
            Add Series
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
                        <th>Series Name</th>
                        <th>Description</th>
                        <th className="text-center">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {seriesList.length > 0 ? (
                        seriesList.map((series, index) => (
                          <tr key={series._id}>
                            <td>{index + 1}</td>
                            <td>{series.name}</td>
                            <td>{series.description}</td>
                            <td className="text-center">
                              <Link to={`/editseries/${series._id}`} className="btn btn-sm btn-golden">
                                <i className="fa-solid fa-pen-to-square"></i>
                              </Link>
                              <button
                                className="btn btn-sm btn-golden ms-2"
                                onClick={() => handleDelete(series._id)}
                              >
                                <i className="fa-solid fa-trash"></i>
                              </button>
                              <button
                                className="btn btn-sm btn-golden ms-2"
                                onClick={() => fetchGenres(series._id)}
                              >
                                <i className="fa-solid fa-list"></i> Show Genres
                              </button>
                              <button
                                className="btn btn-sm btn-golden ms-2"
                                onClick={() => fetchSeasons(series._id)}
                              >
                                <i className="fa-solid fa-list"></i> Show Seasons
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="4" className="text-center">No series available</td>
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

      {/* Modal for displaying genres */}
      <Modal
        title="Series Genres"
        open={modalOpenGenres}
        onCancel={handleModalCancel}
        footer={null}
      >
        <table className="table table-striped">
          <thead>
            <tr>
              <th>No</th>
              <th>Genre Name</th>
              <th>Created At</th>
              <th>Updated At</th>
            </tr>
          </thead>
          <tbody>
            {genres.length > 0 ? (
              genres.map((genre, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{genre.genre}</td>
                  <td>{new Date(genre.createdAt).toLocaleString()}</td>
                  <td>{new Date(genre.updatedAt).toLocaleString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center">No genres available</td>
              </tr>
            )}
          </tbody>
        </table>
      </Modal>

      {/* Modal for displaying seasons */}
      <Modal
        title="Series Seasons"
        open={modalOpenSeasons}
        onCancel={handleModalCancel}
        footer={null}
      >
        <table className="table table-striped">
          <thead>
            <tr>
              <th>No</th>
              <th>Season Name</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {seasons.length > 0 ? (
              seasons.map((season, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{season.name}</td>
                  <td>{season.description}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center">No seasons available</td>
              </tr>
            )}
          </tbody>
        </table>
      </Modal>
    </>
  );
}

export default Index;
