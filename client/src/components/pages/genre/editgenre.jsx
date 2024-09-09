import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Form, Input, Button, notification } from 'antd';
import Header from '../../includes/header';
import Sidebar from '../../includes/sidebar';
import Footer from '../../includes/footer';

const EditGenre = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form] = Form.useForm(); // Create form instance

  const fetchGenre = () => {
    const token = localStorage.getItem('token');
  
    axios.get(`http://localhost:1234/genres/${id}`, {
      headers: { 'Authorization': `Bearer ${token}` },
    })
    .then(res => {
      if (res.status === 200) {
        form.setFieldsValue({ name: res.data.data.name });
      }
    })
    .catch(error => {
      notification.error({ message: 'Failed to fetch genre.', description: error.message });
    });
  };
  

  const handleUpdate = (values) => {
    const token = localStorage.getItem('token');
    axios.patch(`http://localhost:1234/genres/${id}`, values, {
      headers: { 'Authorization': `Bearer ${token}` },
    })
    .then(res => {
      if (res.status === 200) {
        notification.success({
          message: 'Success',
          description: 'Genre Updated Successfully',
          duration: 3
      });
        navigate('/genreindex');
      }
    })
    .catch(error => {
      notification.error({
        message: 'Failed',
        description: 'Failed to Update Genre',error,
        duration: 3
    });
    });
  };
  

  useEffect(() => {
    fetchGenre();
  }, [id]);

  return (
    <>
      <Header />
      <Sidebar />
      <main id="main" className="main">
        <div className="pagetitle">
          <h1>Edit Genre</h1>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">Dashboard</li>
              <li className="breadcrumb-item">Genre</li>
              <li className="breadcrumb-item active">Edit</li>
            </ol>
          </nav>
        </div>
        <section className="section">
          <div className="row">
            <div className="col-lg-12">
              <div className="card">
                <div className="card-body">
                  <Form
                    form={form} 
                    name="edit-genre"
                    onFinish={handleUpdate}
                    layout="vertical"
                  >
                    <Form.Item
                      label="Genre Name"
                      name="name"
                      rules={[{ required: true, message: 'Please input the genre name!' }]}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item>
                     <div className='d-flex justify-content-center'>
                     <Button type="primary" htmlType="submit">
                        Update Genre
                      </Button>
                     </div>
                    </Form.Item>
                  </Form>
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

export default EditGenre;
