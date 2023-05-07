import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { LOG_USER } from '../../GraphQL/userMutations';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const [loginMutation] = useMutation(LOG_USER, {
    onCompleted({ login }) {
      // Store the token in the local storage
      localStorage.setItem('token', login);
      console.log(`User with email: ${email} is logged in`);
      alert(`${email} is logged in!`);
      navigate('/dashboard');
    },
    onError(error) {
      console.log(error.message);
      alert('Invalid credentials');
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = {
      email,
      password,
    };

    loginMutation({ variables: userData });
    setEmail('');
    setPassword('');
  };

  return (
    <div className="form login-form">
      <div className="form-container">
        <div className="header">
          <h2 className="mb-3">Member Login</h2>
        </div>
        <div className="body">
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-2 ">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-control-sm"
                style={{ width: '115%' }}
              />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Password</Form.Label>
              <div className="password-input-container">
                <Form.Control
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <span
                  className="password-icon"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <FaEye /> : <FaEyeSlash />}
                </span>
              </div>
            </Form.Group>
            <p className="text-center small">
              Don't have an account? Register{' '}
              <Link to="/register" className="register-here">
                here
              </Link>
            </p>
            <Link to="/openai">
              <Button className="login-btn mt-2" type="submit">
                Login
              </Button>
            </Link>
          </Form>
        </div>
      </div>
    </div>
  );
}
