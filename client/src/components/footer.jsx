import React from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import Logo from "../assets/Logo.png";
import { BsTwitter } from "react-icons/bs";
import { SiLinkedin } from "react-icons/si";
import { BsYoutube } from "react-icons/bs";
import { FaFacebookF } from "react-icons/fa";

export default function Footer() {
  return (
    <Container fluid className="footer-container">
      <Row>
        <Col className="footer-logo">
          <img src={Logo} alt="Logo" className="logo-image" />
        </Col>
        <Col className="footer-text">
        <p>
          <h1 style={{ color: '#522A83' }}>
          Connect with us
          </h1>
          <span style={{ color: '#522A83' }}>MAIN OFFICE</span>
          <br />
          <span>123 Anywhere St.</span>
          <br />
          <span>Any City, State</span>
          <br />
          <span>Any Country</span>
          <br />
          <span>(123) 456 7890</span>
          <br />
          <span>gymgenie.chatgpt@gmail.com</span>
          </p>
        </Col>
        <Col className="footer-social">
        <h1 className="footer-text" style={{ color: '#522A83' }}>
          Social Media
          </h1>
        <div className="social-icon">
          <a href="https://www.twitter.com"> <BsTwitter /> </a>
          <a href="https://linkedin.com"><SiLinkedin /></a>
          <a href="https://youtube.com"><BsYoutube /></a>
          <a href="https://facebook.com"><FaFacebookF /></a>
        </div> 
        </Col>
      </Row>
      <p className="center">&copy; {new Date().getFullYear()} GymGenie. All rights reserved.</p>
    </Container>
  )
}
