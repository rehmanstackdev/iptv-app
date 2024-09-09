import React from 'react';
import Header from '../../includes/header';
import Sidebar from '../../includes/sidebar';
import Footer from '../../includes/footer';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, notification } from 'antd';
import axios from 'axios';

const AddGenre = () => {
  const navigate = useNavigate();

  const handleSubmit = (values) => {
    const token = localStorage.getItem('token');

    axios.post(
      'http://localhost:1234/genres',
      { name: values.genre },
      { headers: { 'Authorization': `Bearer ${token}` } }
    )
    .then(() => {
      notification.success({
        message: 'Created',
        description: 'Genre Created Successfully',
        duration: 3
    });
      navigate('/genreindex');
    })
    .catch(() => {
      notification.error({
        message: 'Failed',
        description: 'Failed to Created Genre',
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
          <h1>Add Genre</h1>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">Dashboard</li>
              <li className="breadcrumb-item">Genre</li>
              <li className="breadcrumb-item active">Add</li>
            </ol>
          </nav>
        </div>
       <div className='card'>
       <div className="card-body">
          <Form layout="vertical" onFinish={handleSubmit}>
            <Form.Item
              label="Genre Name"
              name="genre"
              rules={[{ required: true, message: 'Please enter the genre name!' }]}
            >
              <Input placeholder="Enter genre name" />
            </Form.Item>
            <Form.Item>
              <div className='d-flex justify-content-center'>
              <Button type="primary " htmlType="submit">Add Genre</Button>
              </div>
            </Form.Item>
          </Form>
        </div>
       </div>
      </main>
      <Footer />
    </>
  );
};

export default AddGenre;
