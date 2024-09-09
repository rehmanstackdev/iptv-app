import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { notification } from 'antd';
const Signup = () => {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    axios.post('http://localhost:1234/users/registration', {
      first_name: firstname,
      last_name: lastname,
      email,
      password,
    })
    .then(() => {
      navigate('/');
      notification.success({
        message: 'Success',
        description: 'User Register Successfully',
        duration: 3
    });
    })
    .catch((error) => {
      notification.error({
        message: 'Failed',
        description: 'User Failed to Register',error,
        duration: 3
    });
    });
  };
  

  return (
    <main className='bg-blue'>
      <div className="container">
        <section className="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">
                <div className="card mb-2">
                  <div className="card-body">
                    <div className="pb-2">
                      <h5 className="card-title text-center pb-0 fs-4">Create an Account</h5>
                    </div>
                    <form className="row g-3 needs-validation" onSubmit={handleSubmit}>
                      <div className="col-12">
                        <label className="form-label">First Name</label>
                        <input
                          type="text"
                          className="form-control"
                          value={firstname}
                          onChange={(e) => setFirstname(e.target.value)}
                          required
                        />
                        <div className="invalid-feedback">Please, enter your first name!</div>
                      </div>
                      <div className="col-12">
                        <label className="form-label">Last Name</label>
                        <input
                          type="text"
                          className="form-control"
                          value={lastname}
                          onChange={(e) => setLastname(e.target.value)}
                          required
                        />
                        <div className="invalid-feedback">Please, enter your last name!</div>
                      </div>
                      <div className="col-12">
                        <label className="form-label">Your Email</label>
                        <input
                          type="email"
                          className="form-control"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                        <div className="invalid-feedback">Please enter a valid Email address!</div>
                      </div>
                      <div className="col-12">
                        <label className="form-label">Password</label>
                        <input
                          type="password"
                          className="form-control"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                        <div className="invalid-feedback">Please enter your password!</div>
                      </div>
                      <div className="col-12">
                        <button className="btn btn-primary w-100" type="submit">Create Account</button>
                      </div>
                      <div className="col-12">
                        <p className="small mb-0">Already have an account? <Link to="/">Login</Link></p>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Signup;
