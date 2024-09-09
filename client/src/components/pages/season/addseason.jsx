import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Select, Button, Form, Input,notification } from 'antd';
import { useNavigate } from 'react-router-dom';
import Header from '../../includes/header';
import Sidebar from '../../includes/sidebar';
import Footer from '../../includes/footer';

const { Option } = Select;
const { TextArea } = Input;
function AddSeason() {
  const [series, setSeries] = useState([]);
  const navigate =useNavigate()
  const token = localStorage.getItem('token');

  useEffect(() => {
    axios.get('http://localhost:1234/series', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(response => {
      const seriesOptions = response.data.data.map(series => ({
        id: series._id,
        name: series.name
      }));
      setSeries(seriesOptions);
    })
    .catch(error => {
      notification.error({ 
        message: 'Failed',
        description: 'Failed to Fetch a Series', error,
        duration:3
       });
    });
  }, [token]);

  const handleSubmit = (values) => {
    const token = localStorage.getItem('token');
    const payload = {
      series_id: values.series,
      name: values.seasonName,
      description: values.description,
    };

    axios.post('http://localhost:1234/seasons', payload, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(response => {
      notification.success({ 
        message: 'Created',
        description: 'Season Created Successfully',
        duration:3
       });
       navigate('/seasonindex');
    })
    .catch(error => {
      notification.error({ 
        message: 'Failed',
        description: 'Failed to Created Season', error,
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
          <h1>Add Season</h1>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">Dashboard</li>
              <li className="breadcrumb-item">Add</li>
              <li className="breadcrumb-item active">Season</li>
            </ol>
          </nav>
        </div>
      <div className='card'>
      <div className='card-body '>
          <Form onFinish={handleSubmit}>
            <Form.Item
              label="Season Name"
              name="seasonName"
              rules={[{ required: true, message: 'Please enter the Season name!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Description"
              name="description"
              rules={[{ required: true, message: 'Please enter the description!' }]}
            >
              <TextArea placeholder="Enter Season description" rows={4} />
            </Form.Item>

            <Form.Item
              label="Select Series"
              name="series" 
              rules={[{ required: true, message: 'Please select a Series!' }]}
            >
              <Select placeholder="Select Series">
                {series.map(series => (
                  <Option key={series.id} value={series.id}>{series.name}</Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item className='d-flex justify-content-center'>
              <Button type="primary" htmlType="submit">
                Add Season
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

export default AddSeason;
