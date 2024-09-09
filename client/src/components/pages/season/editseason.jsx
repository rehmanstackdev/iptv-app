import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Form, Input, Button, Select, Spin, notification} from 'antd';
import Header from '../../includes/header';
import Sidebar from '../../includes/sidebar';
import Footer from '../../includes/footer';

const { Option } = Select;
const { TextArea } = Input;

function EditSeason() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [series, setSeries] = useState([]);
  const token = localStorage.getItem('token');

  const [form] = Form.useForm();
  useEffect(() => {
    axios.get(`http://localhost:1234/seasons/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(response => {
      const season = response.data.data;
      form.setFieldsValue({
        name: season.name,
        description: season.description,
        series: season.series_id
      });
    })
    .catch(error => {
      notification.error({ 
        message: 'Failed',
        description: 'Failed to Fetch Season', error,
        duration:3
       });
    });
  }, [id, token, form]);

  useEffect(() => {
    axios.get('http://localhost:1234/series', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(response => {
      setSeries(response.data.data); // Store the series data in state
    })
    .catch(error => {
      notification.error({ 
        message: 'Failed',
        description: 'Failed to Fetch Series', error,
        duration:3
       });
    });
  }, [token]);

  // Handle form submission
  const handleSubmit = (values) => {
    const updatedValues = {
      name: values.name,
      description: values.description,
      series_id: values.series,  
    };
    axios.patch(`http://localhost:1234/seasons/${id}`, updatedValues, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(response => {
      notification.success({ 
        message: 'Success',
        description: 'Season Updated Successfully',
        duration:3
       });
      navigate('/seasonindex');
    })
    .catch(error => {
      notification.error({ 
        message: 'Failed',
        description: 'Failed to Updated Season',
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
          <h1>Edit Season</h1>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">Dashboard</li>
              <li className="breadcrumb-item">Season</li>
              <li className="breadcrumb-item active">Edit</li>
            </ol>
          </nav>
        </div>
        <div className='card'>
        <div className="card-body">
          <Form form={form} onFinish={handleSubmit} layout="vertical">
            <Form.Item
              label="Season Name"
              name="name"
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
                {series.map((item) => (
                  <Option key={item._id} value={item._id}>
                    {item.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item className="d-flex justify-content-center">
              <Button type="primary" htmlType="submit">
                Update Season
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

export default EditSeason;
