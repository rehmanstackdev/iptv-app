
import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { notification } from 'antd';
import axios from 'axios';
function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
  
    axios.post('http://localhost:1234/users/login', { email, password })
      .then((response) => {
        localStorage.setItem('token', response.data.data.token); 
        navigate('/dashboard');
        notification.success({
          message: 'Success',
          description: 'User Login Successfully',
          duration: 3
      });
      })
      .catch((error) => {
        notification.error({
          message: 'Failed',
          description: 'User Failed to Login', error,
          duration: 3
      });
      });
  };
  
  return (
    <main className='bg-blue'>
  <div className="containe">
    <section className="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">
           
            <div className="card mb-3">
              <div className="card-body">
                <div className="pt-4 pb-2">
                  <h5 className="card-title text-center pb-0 fs-4">Login to Your Account</h5>
                  <p className="text-center small">Enter your email &amp; password to login</p>
                </div>
                <form className="row g-3 needs-validation" onSubmit={handleSubmit}>
                  <div className="col-12">
                    <label className="form-label">Email</label>
                    <div className="input-group has-validation">
                      <span className="input-group-text">@</span>
                      <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
                      <div className="invalid-feedback">Please enter your email.</div>
                    </div>
                  </div>
                  <div className="col-12">
                    <label className="form-label">Password</label>
                    <input type="password" className="form-control"  value={password} onChange={(e) => setPassword(e.target.value)} required />
                    <div className="invalid-feedback">Please enter your password!</div>
                  </div>
                  <div className="col-12">
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" name="remember" defaultValue="true" id="rememberMe" />
                      <label className="form-check-label" htmlFor="rememberMe">Remember me</label>
                    </div>
                  </div>
                  <div className="col-12">
                    <button className="btn btn-primary w-100" type="submit">Login</button>
                  </div>
                  <div className="col-12">
                    <p className="small mb-0">Don't have account? <Link to="/signup">Create an account</Link></p>
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

  )
}

export default Login