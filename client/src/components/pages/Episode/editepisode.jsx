import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Form, Input, Button, Select, notification } from 'antd';
import Header from '../../includes/header';
import Sidebar from '../../includes/sidebar';
import Footer from '../../includes/footer';

const { Option } = Select;
const { TextArea } = Input;

function EditEpisode() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [thumbnails, setThumbnails] = useState([]);
  const [seasons, setSeasons] = useState([]); 
  const token = localStorage.getItem('token'); 
  const [form] = Form.useForm();


  useEffect(() => {
    axios
      .get(`http://localhost:1234/episodes/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const episode = response.data.data;
        form.setFieldsValue({
          name: episode.name, 
          description: episode.description,
          thumbnail: episode.thumbnail_id, 
          season: episode.season_id, 
        });
      })
      .catch((error) => {
        notification.error({
          message: 'Failed',
          description:'Failed to Fatch Episode', error,
          duration:3
        });
      });
  }, [id, token, form]);

  // Fetch all files
  useEffect(() => {
    axios
      .get('http://localhost:1234/files', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setThumbnails(response.data.data);
      })
      .catch((error) => {
        notification.error({
          message: 'Failed',
          description:'Failed to Fetch File', error,
          duration:3
        });
      });
  }, [token]);

  // Fetch all seasons
  useEffect(() => {
    axios
      .get('http://localhost:1234/seasons', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setSeasons(response.data.data); 
      })
      .catch((error) => {
        notification.error({
          message: 'Failed',
          description:'Failed to fetch Season', error,
          duration:3
        });
      });
  }, [token]);

  // Handle form submission
  const handleSubmit = (values) => {
    const updatedValues = {
      name: values.name,
      description: values.description, 
      thumbnail_id: values.thumbnail, 
      season_id: values.season, 
    };

    axios
      .patch(`http://localhost:1234/episodes/${id}`, updatedValues, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        notification.success({
          message: 'Success',
          description: 'Episode Updated Successfully!',
          duration:3
        });
        navigate('/episodeindex');
      })
      .catch((error) => {
        notification.error({
          message: 'Failed',
          description:'Failed to Update Episode', error,
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
          <h1>Edit Episode</h1>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">Dashboard</li>
              <li className="breadcrumb-item">Episode</li>
              <li className="breadcrumb-item active">Edit</li>
            </ol>
          </nav>
        </div>
     <div className='card'>
     <div className="card-body">
          <Form form={form} onFinish={handleSubmit} layout="vertical">
            <Form.Item
              label="Episode Name"
              name="name"
              rules={[{ required: true, message: 'Please enter the episode name!' }]}
            >
              <Input />
            </Form.Item>

            {/* Description */}
            <Form.Item
              label="Description"
              name="description"
              rules={[{ required: true, message: 'Please enter the description!' }]}
            >
              <TextArea placeholder="Enter episode description" rows={4} />
            </Form.Item>

            {/* Select Thumbnail */}
            <Form.Item
              label="Select Thumbnail"
              name="thumbnail"
              rules={[{ required: true, message: 'Please select a thumbnail!' }]}
            >
              <Select placeholder="Select thumbnail">
                {thumbnails.map((file) => (
                  <Option key={file._id} value={file._id}>
                    {file.original_name}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            {/* Select Season */}
            <Form.Item
              label="Select Season"
              name="season"
              rules={[{ required: true, message: 'Please select a season!' }]}
            >
              <Select placeholder="Select season">
                {seasons.map((season) => (
                  <Option key={season._id} value={season._id}>
                    {season.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item className="d-flex justify-content-center">
              <Button type="primary" htmlType="submit">
                Update Episode
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

export default EditEpisode;
