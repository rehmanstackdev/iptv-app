import React from 'react';
import { Form, Button, Upload, notification } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../../includes/header';
import Sidebar from '../../includes/sidebar';
import Footer from '../../includes/footer';

function AddFile() {
    const [form] = Form.useForm();
    const navigate =useNavigate()
    const handleSubmit = (values) => {
        const file = values.file[0].originFileObj; 
        const token = localStorage.getItem('token');
        const formData = new FormData();
        formData.append('file', file);

        axios.post('http://localhost:1234/files', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`,
            },
        })
        .then(() => {
           
            notification.success({
                message: 'Success',
                description: 'File uploaded Successfully',
                duration: 3
             });
            form.resetFields();
            navigate('/fileindex'); 
        })
        .catch((error) => {
            notification.error({
                message: 'Failed',
                description: 'Failed to Upload File', error,
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
                    <h1>Add File</h1>
                    <nav>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item">Dashboard</li>
                            <li className="breadcrumb-item">Add</li>
                            <li className="breadcrumb-item active">File</li>
                        </ol>
                    </nav>
                </div>
               <div className='card'>
               <div className='card-body'>
                    <Form
                        form={form}
                        onFinish={handleSubmit}
                        layout="vertical"
                    >
                        <Form.Item
                            name="file"
                            label="Upload File"
                            valuePropName="fileList"
                            getValueFromEvent={(e) => e && e.fileList}
                            rules={[{ required: true, message: 'Please upload a file!' }]}
                        >
                            <Upload
                                name="file"
                                listType="text"
                                beforeUpload={() => false} 
                                showUploadList={false} 
                                accept="image/*" 
                            >
                                <Button icon={<UploadOutlined />}>Upload</Button>
                            </Upload>
                        </Form.Item>
                        <Form.Item>
                            <div className='text-center'> 
                            <Button type="primary" htmlType="submit">Add File</Button>
                            </div>
                        </Form.Item>
                    </Form>
                </div>
               </div>
            </main>
            <Footer />
        </>
    );
}

export default AddFile;
