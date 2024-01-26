import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [registrationData, setRegistrationData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [loginError, setLoginError] = useState(null);
  const [registrationError, setRegistrationError] = useState(null);
  const navigate = useNavigate();

  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleRegistrationChange = (e) => {
    setRegistrationData({ ...registrationData, [e.target.name]: e.target.value });
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();

    // Simple validation for login
    if (!loginData.email || !loginData.password) {
      setLoginError('Email and password are required');
      return;
    }

    // Implement login logic here using loginData
    console.log('Login data submitted:', loginData);

    // Assuming login is successful, navigate to the dashboard
    navigate('/dashboard');
  };

  const handleRegistrationSubmit = (e) => {
    e.preventDefault();

    // Simple validation for registration
    if (!registrationData.firstName || !registrationData.lastName || !registrationData.email || !registrationData.password || !registrationData.confirmPassword) {
      setRegistrationError('All fields are required');
      return;
    }

    if (registrationData.password !== registrationData.confirmPassword) {
      setRegistrationError('Passwords do not match');
      return;
    }

    // Implement registration logic here using registrationData
    console.log('Registration data submitted:', registrationData);
    console.log('Navigating to dashboard...');
    setTimeout(() => {
      navigate('/dashboard');
    }, 0);
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Login</h2>
        <form onSubmit={handleLoginSubmit}>
          <label>
            Email:
            <input type="text" name="email" value={loginData.email} onChange={handleLoginChange} />
          </label>
          <label>
            Password:
            <input type="password" name="password" value={loginData.password} onChange={handleLoginChange} />
          </label>
          <button type="submit">Login</button>
          {loginError && <p className="error-message">{loginError}</p>}
        </form>
      </div>

      <div className="registration-form">
        <h2>Registration</h2>
        <form onSubmit={handleRegistrationSubmit}>
          <label>
            First Name:
            <input type="text" name="firstName" value={registrationData.firstName} onChange={handleRegistrationChange} />
          </label>
          <label>
            Last Name:
            <input type="text" name="lastName" value={registrationData.lastName} onChange={handleRegistrationChange} />
          </label>
          <label>
            Email:
            <input type="email" name="email" value={registrationData.email} onChange={handleRegistrationChange} />
          </label>
          <label>
            Password:
            <input type="password" name="password" value={registrationData.password} onChange={handleRegistrationChange} />
          </label>
          <label>
            Confirm Password:
            <input type="password" name="confirmPassword" value={registrationData.confirmPassword} onChange={handleRegistrationChange} />
          </label>
          <button type="submit">Register</button>
          {registrationError && <p className="error-message">{registrationError}</p>}
        </form>
      </div>
    </div>
  );
};

export default Login;