import { Container, Navbar, Nav } from 'react-bootstrap'
import logo from '../../assets/logo.png'
import { Link } from 'react-router-dom'

export default function Navhome({ hideLinks }) {
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
            <Nav.Link className="nav-items" href="#home">
              Home
            </Nav.Link>
            <Nav.Link className="nav-items" href="#about">
              About
            </Nav.Link>
            <Nav.Link className="nav-items" href="#services">
              Services
            </Nav.Link>
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
  )
}
