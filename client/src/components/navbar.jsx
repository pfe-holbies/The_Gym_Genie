import React from "react";
import Logo from "../assets/Logo.png";
import { Container, Navbar, Nav, Button } from "react-bootstrap";

export default function MyNavbar() {
  return (
    <Navbar bg="Regalia" variant="dark" expand="lg" style={{ backgroundColor: '#522A83', width:"106%", marginLeft:"-6%" }}>
      <Container>
        <Navbar.Brand href="#home">
          <img
            src={Logo}
            alt="Logo"
            height="100" 
            width="100"
            className="d-inline-block align-top"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" style={{ marginLeft: '50%' }} >
          <Nav className="me-auto" >
            <Nav.Item className="ms-auto"></Nav.Item>
            <Nav.Link style={{ color: '#E4BD5B' }} href="#home">Home</Nav.Link>
            <Nav.Link style={{ color: '#E4BD5B' }} href="#about">About</Nav.Link>
            <Nav.Link style={{ color: '#E4BD5B' }} href="#services">Services</Nav.Link>
          </Nav>
          <Button href="#register" style={{ backgroundColor: '#E4BD5B', color: '#522A83', borderRadius:"20px" }}>Register</Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
