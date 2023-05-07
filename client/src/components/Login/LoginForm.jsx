import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { FaEye, FaEyeSlash } from 'react-icons/fa'

export default function LoginForm() {
  const [loginData, setloginData] = useState({
    email: '',
    password: '',
  })
  const [showPassword, setShowPassword] = useState(false)

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  return (
    <div className="form login-form">
      <div className="form-container">
        <div className="header">
          <h2 className="mb-3">Member Login</h2>
        </div>
        <div className="body">
          <Form>
            <Form.Group className="mb-2 ">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={loginData.email}
                onChange={(event) =>
                  setloginData({ ...loginData, email: event.target.value })
                }
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
                  value={loginData.password}
                  onChange={(event) =>
                    setloginData({ ...loginData, password: event.target.value })
                  }
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
  )
}
