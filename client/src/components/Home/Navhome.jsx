import logo from '../../assets/logo.gif';
import { useContext } from 'react';
import { Container, Navbar, Nav, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../utils/authContext';
import { FaUser } from 'react-icons/fa';

export default function Navhome({ hideLinks }) {
  let navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);

  const onLogout = () => {
    logout();
    navigate('/');
  };

  if (user) {
    return (
      <Navbar className="navbar" sticky="top" expand="lg" id="home">
        <Container className="d-flex align-items-center justify-content-between">
          <Navbar.Brand className="brand">
            <Link to="/">
              <img
                src={logo}
                height="46rem"
                className="d-inline-block align-top"
                alt="Logo"
              />
            </Link>
          </Navbar.Brand>
          {!hideLinks && (
            <Nav className="ms-auto">
              <Button className="nav-items ms-3 btn btn-welcome">
                <FaUser className="me-2" />
                Hello, {user.username}
              </Button>
              <Button
                onClick={() => navigate('/plan')}
                className="btn ms-3 btn-dashboard"
              >
                Plan
              </Button>
              <Button
                onClick={() => navigate('/dashboard')}
                className="btn ms-3 btn-dashboard"
              >
                Dashboard
              </Button>
              <Button
                className="nav-items ms-3 btn btn-dashboard"
                onClick={onLogout}
              >
                Logout
              </Button>
            </Nav>
          )}
        </Container>
      </Navbar>
    );
  } else {
    return (
      <Navbar className="navbar" sticky="top" expand="lg" id="home">
        <Container className="d-flex align-items-center justify-content-between">
          <Navbar.Brand className="brand">
            <Link to="/">
              <img
                src={logo}
                height="46rem"
                className="d-inline-block align-top"
                alt="Logo"
              />
            </Link>
          </Navbar.Brand>
          {!hideLinks && (
            <Nav className="ms-auto">
              <div className="left-links">
                <Nav.Link className="nav-items" href="#home">
                  Home
                </Nav.Link>
                <Nav.Link className="nav-items" href="#about">
                  About
                </Nav.Link>
                <Nav.Link className="nav-items" href="#services">
                  Services
                </Nav.Link>
              </div>
              <Link to="/register" className="btn btn-signup btn-hover ms-3">
                SignUp{' '}
              </Link>
              <Link to="/login" className="btn btn-signup btn-hover ms-3">
                Login
              </Link>
            </Nav>
          )}
        </Container>
      </Navbar>
    );
  }
}
