import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Form, Input, Button, Select, notification } from 'antd';
import Header from '../../includes/header';
import Sidebar from '../../includes/sidebar';
import Footer from '../../includes/footer';

const { Option } = Select;
const { TextArea } = Input;

function EditSeries() {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [series, setSeries] = useState([]);
  const [genres, setGenres] = useState([]); 
  const token = localStorage.getItem('token');

  const [form] = Form.useForm();

  useEffect(() => {
    axios.get(`http://localhost:1234/series/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(response => {
      const series = response.data.data;
      form.setFieldsValue({
        name: series.name,
        description: series.description,
        thumbnail: series.thumbnail_id,
        trailer: series.trailer_id,
        genres: series.genre_ids
      });
    })
    .catch(error => {
      notification.error({
        message: 'Failed',
        description: 'Failed to Fetch Series.',error,
        duration:3
      });
    });
  }, [id, token, form]);

  useEffect(() => {
    axios.get('http://localhost:1234/files', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(response => {
      setSeries(response.data.data);
    })
    .catch(error => {
      notification.error({
        message: 'Failed',
        description: 'Failed to Fetch Files',error,
        duration:3
      });
    });
  }, [token]);

  useEffect(() => {
    axios.get('http://localhost:1234/genres', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(response => {
      setGenres(response.data.data); 
    })
    .catch(error => {
      notification.error({
        message: 'Failed',
        description:'Failed to Fetch Genres.',error,
        duration:3
      });
    });
  }, [token]);

  const handleSubmit = (values) => {
    const updatedValues = {
      name: values.name,
      description: values.description,
      thumbnail_id: values.thumbnail, 
      trailer_id: values.trailer,   
      genre_ids: values.genres  
    };

    axios.patch(`http://localhost:1234/series/${id}`, updatedValues, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(response => {
      notification.success({
        message: 'Success',
        description: 'Series Updated Successfully:',
        duration:3
      });
      navigate('/seriesindex');
    })
    .catch(error => {
      notification.error({
        message: 'Failed',
        description: 'Failed to update series',error,
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
          <h1>Edit Series</h1>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">Dashboard</li>
              <li className="breadcrumb-item">Series</li>
              <li className="breadcrumb-item active">Edit</li>
            </ol>
          </nav>
        </div>
        <div className='card'>
        <div className="card-body">
          <Form form={form} onFinish={handleSubmit} layout="vertical">
            <Form.Item
              label="Series Name"
              name="name"
              rules={[{ required: true, message: 'Please enter the Series name!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Description"
              name="description"
              rules={[{ required: true, message: 'Please enter the description!' }]}
            >
              <TextArea placeholder="Enter Series description" rows={4} />
            </Form.Item>

            <Form.Item
              label="Select Thumbnail"
              name="thumbnail"
              rules={[{ required: true, message: 'Please select a Thumbnail!' }]}
            >
              <Select placeholder="Select Thumbnail">
                {series.map((thumbnail) => (
                  <Option key={thumbnail._id} value={thumbnail._id}>
                    {thumbnail.original_name}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              label="Select Trailer"
              name="trailer"
              rules={[{ required: true, message: 'Please select a Trailer!' }]}
            >
              <Select placeholder="Select Trailer">
                {series.map((trailer) => (
                  <Option key={trailer._id} value={trailer._id}>
                    {trailer.original_name}
                  </Option>
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
                  <Option key={genre._id} value={genre._id}>
                    {genre.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item className="d-flex justify-content-center">
              <Button type="primary" htmlType="submit">
                Update Series
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

export default EditSeries;
