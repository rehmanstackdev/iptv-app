import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { notification } from 'antd';
import Header from '../../includes/header';
import Sidebar from '../../includes/sidebar';
import Footer from '../../includes/footer';

const Index = () => {
    const [files, setFiles] = useState([]);

    const token = localStorage.getItem('token');
    useEffect(() => {
        axios.get('http://localhost:1234/files', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            setFiles(response.data.data);
        })
        .catch(error => {
            notification.error({
                message: 'Failed',
                description: 'Failed to fatch a File',
            });
        });
    }, [token]);

    // Delete a file
    const handleDelete = (id) => {
        axios.delete(`http://localhost:1234/files/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(() => {
            setFiles(files.filter(file => file._id !== id));
            notification.success({
                message: 'Success',
                description: 'File Deleted Successfully',
                duration:3
            });
        })
        .catch(error => {
            notification.error({
                message: 'Error',
                description: 'Failed to Delete file',
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
                    <h1>File Detail</h1>
                    <nav>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item">Dashboard</li>
                            <li className="breadcrumb-item">File</li>
                            <li className="breadcrumb-item active">Detail</li>
                        </ol>
                    </nav>
                </div>
                <div className="d-flex justify-content-end mb-3">
                    <Link to="/addfile" className="btn btn-golden mt-2">
                        Add File
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
                                                <th>File Name</th>
                                                <th>File Type</th>
                                                <th>File</th>
                                                <th className='text-center'>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {files.length > 0 ? (
                                                files.map((file, index) => (
                                                    <tr key={file._id}>
                                                        <td>{index + 1}</td>
                                                        <td>{file.original_name}</td>
                                                        <td>{file.type}</td>
                                                        <td>
                                                            <img
                                                                src={`http://localhost:1234/uploads/${file.current_name}`}
                                                                alt={file.original_name}
                                                                style={{ width: '80px', height: '100px' }}
                                                            />
                                                        </td>
                                                        <td  className='text-center'>
                                                            <button
                                                                className="btn btn-sm btn-golden"
                                                                onClick={() => handleDelete(file._id)}
                                                            >
                                                                <i className="fa-solid fa-trash"></i>
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan="5" className='text-center'>No files available</td>
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
};

export default Index;
