import GymGeniePurple from '../../assets/GymGeniePurple.png';
import { Form, Button } from 'react-bootstrap';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useContext, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { LOG_USER } from '../../GraphQL/userMutations';
import { useMutation } from '@apollo/client';
import { AuthContext } from '../../utils/authContext';

export default function LoginForm() {
  const context = useContext(AuthContext);
  let navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Toggle Password Visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // handle Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    loginMutation();
    console.log(`User ${username} logged in successfully`);

    setUsername('');
    setEmail('');
    setPassword('');
  };

  // trigger backend loginMutation() function
  const [loginMutation] = useMutation(LOG_USER, {
    update(_, { data: { loginMutation: userData } }) {
      context.login(userData);
      navigate('/dashboard');
    },
    variables: {
      username,
      email,
      password,
    },
  });

  return (
    <div className="login-box">
      <div className="form login-form">
        <div className="login-form-container">
          <div className="header">
            <h2 className="mb-3 text-center ">Log in to your account</h2>
          </div>
          <div className="body ">
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-2 form-control-sm ">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Username..."
                  onChange={(e) => setUsername(e.target.value)}
                  className="form-control-sm"
                  style={{ width: '115%' }}
                />
              </Form.Group>
              <Form.Group className="mb-2 form-control-sm ">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Email..."
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-control-sm"
                  style={{ width: '115%' }}
                />
              </Form.Group>
              <Form.Group className="mb-2 form-control-sm">
                <Form.Label>Password</Form.Label>
                <div className="password-input-container">
                  <Form.Control
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Password..."
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
                Don't have an account?{' '}
                <Link to="/register" className="register-here">
                  Register
                </Link>
              </p>
              <Button
                className="login-btn push-btn "
                type="submit"
                onClick={handleSubmit}
              >
                Login
              </Button>
            </Form>
          </div>
          <div> </div>
          <img src={GymGeniePurple} className="login-img" />
        </div>
      </div>
    </div>
  );
}
