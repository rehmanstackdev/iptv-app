import React, { useState, useEffect } from 'react';
import { Select, Button, Form, Input, notification } from 'antd';
import Header from '../../includes/header';
import Sidebar from '../../includes/sidebar';
import Footer from '../../includes/footer';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const { Option } = Select;
const { TextArea } = Input;

function AddSeries() {
  const [files, setFiles] = useState([]); 
  const [genres, setGenres] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    axios.get('http://localhost:1234/files', {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(response => {
      const files = response.data.data.map(file => ({
        id: file._id,
        name: file.original_name
      }));
      setFiles(files); 
    })
    .catch(error => {
      notification.error({ 
        message: 'Failed',
        description: 'Failed to Fetch a File', error,
        duration:3
       });
    });

    // Fetch genres
    axios.get('http://localhost:1234/genres', {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(response => {
      const genreOptions = response.data.data.map(genre => ({
        id: genre._id,
        name: genre.name
      }));
      setGenres(genreOptions);
    })
    .catch(error => {
      notification.error({ 
        message: 'Failed',
        description: 'Failed to Fetch a Genre', error,
        duration:3
       });
    });
  }, [token]);

  const handleSubmit = (values) => {
    const payload = {
      name: values.seriesName,
      trailer_id: values.trailer,
      thumbnail_id: values.thumbnail,
      genre_ids: values.genres,
      description: values.description
    };

    axios.post('http://localhost:1234/series', payload, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(response => {
      notification.success({ 
        message: 'Created',
        description: 'Series Created Successfully',
        duration:3
       });
      navigate('/seriesindex');  
    })
    .catch(error => {
      notification.error({ 
        message: 'Failed',
        description: 'Failed to Created a Series', error,
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
          <h1>Add Series</h1>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">Dashboard</li>
              <li className="breadcrumb-item">Add</li>
              <li className="breadcrumb-item active">Series</li>
            </ol>
          </nav>
        </div>
       <div className='card'>
       <div className='card-body'>
          <Form onFinish={handleSubmit}>
            <Form.Item
              label="Series Name"
              name="seriesName"
              rules={[{ required: true, message: 'Please enter the series name!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Description"
              name="description"
              rules={[{ required: true, message: 'Please enter the description!' }]}
            >
              <TextArea placeholder="Enter series description" rows={4} />
            </Form.Item>

            <Form.Item
              label="Select Trailer"
              name="trailer"
              rules={[{ required: true, message: 'Please select a trailer!' }]}
            >
              <Select placeholder="Select trailer">
                {files.map((file) => (
                  <Option key={file.id} value={file.id}>{file.name}</Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              label="Select Thumbnail"
              name="thumbnail"
              rules={[{ required: true, message: 'Please select a thumbnail!' }]}
            >
              <Select placeholder="Select thumbnail">
                {files.map((file) => (
                  <Option key={file.id} value={file.id}>{file.name}</Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              label="Select Genres"
              name="genres"
              rules={[{ required: true, message: 'Please select at least one genre!' }]}
            >
              <Select mode="multiple" placeholder="Select genres">
                {genres.map((genre) => (
                  <Option key={genre.id} value={genre.id}>{genre.name}</Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item className='d-flex justify-content-center'>
              <Button type="primary" htmlType="submit">
                Add Series
              </Button>
            </Form.Item>
          </Form>
        </div>
       </div>
      </main>
      <Footer />
    </>
  );
}

export default AddSeries;
