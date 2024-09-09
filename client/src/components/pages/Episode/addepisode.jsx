import React, {useState, useEffect} from 'react'
import { Select, Button, Form, Input, notification } from 'antd';
import Header from '../../includes/header';
import Sidebar from '../../includes/sidebar';
import Footer from '../../includes/footer';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const { Option } = Select;
const { TextArea } = Input;
function addepisode() {
  const [files, setFiles] = useState([]); 
  const [season, setSeason] = useState([]); 
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
        description: 'Failed to Fetch File', error,
        duration:3
      });
    });

    // Fetch season
    axios.get('http://localhost:1234/seasons', {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(response => {
      const seasons = response.data.data.map(season => ({
        id: season._id,
        name: season.name
      }));
      setSeason(seasons); 
    })
    .catch(error => {
      notification.error({
        message: 'Failed',
        description: 'Failed to Fetch Season', error,
        duration:3
      });
    });
  }, [token]);

  const handleSubmit = (values) => {
    const payload = {
      name: values.episodeName,
      description: values.description,
      thumbnail_id: values.thumbnail,
      season_id: values.season,
      
    };

    axios.post('http://localhost:1234/episodes', payload, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(response => {
      notification.success({
        message: 'Created',
        description: 'Episode Created Successfully',
        duration:3
      });
      navigate('/episodeindex');  
    })
    .catch(error => {
      notification.error({
        message: 'Failed',
        description: 'Failed to Created Episode', error,
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
          <h1>Add Episode</h1>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">Dashboard</li>
              <li className="breadcrumb-item">Add</li>
              <li className="breadcrumb-item active">Episode</li>
            </ol>
          </nav>
        </div>
        <div className='card'>
        <div className='card-body'>
          <Form onFinish={handleSubmit}>
            <Form.Item
              label="Episode Name"
              name="episodeName"
              rules={[{ required: true, message: 'Please enter the episode name!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Description"
              name="description"
              rules={[{ required: true, message: 'Please enter the description!' }]}
            >
              <TextArea placeholder="Enter episode description" rows={4} />
            </Form.Item>
            <Form.Item
              label="Select Season"
              name="season"
              rules={[{ required: true, message: 'Please select a season!' }]}
            >
              <Select placeholder="Select season">
                {season.map((season) => (
                  <Option key={season.id} value={season.id}>{season.name}</Option>
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
            <Form.Item className='d-flex justify-content-center'>
              <Button type="primary" htmlType="submit">
                Add Episode
              </Button>
            </Form.Item>
          </Form>
        </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

export default addepisode