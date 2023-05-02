// src/UpdatePassword.js
import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import BannerImage from "../../assets/home-banner-image.png";

export default function UpdatePassword() {
  const [passwords, setPasswords] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(passwords);
  };

  const handleCancel = () => {
    setPasswords({ newPassword: "", confirmPassword: "" });
  };

  return (
    <Container className="update-password-container">
      <Row className="update-password-row">
        <Col className="update-password-content">
          <h2 style={{ color: "#FFFFFF", marginTop:"20%", marginBottom:"5%" }}>Update Password</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group as={Row} controlId="newPassword">
              <Form.Label column sm="2" style={{ color: "#FFFFFF", marginBottom:"-40px" }}>
              <span style={{ whiteSpace: "nowrap" }}>Create new password:</span> 
              </Form.Label>
              <Col sm="11">
                <Form.Control
                  type="password"
                  name="newPassword"
                  value={passwords.newPassword}
                  onChange={handleChange}
                  className="label-newline"
                  style={{ borderColor: "#E4BD5B", borderWidth:"3px" }}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="confirmPassword">
              <Form.Label column sm="2" style={{ color: "#FFFFFF", marginBottom:"-20%" }}>
                <span style={{ whiteSpace: "nowrap" }}>Confirm new password:</span>
              </Form.Label>
              <Col sm="11">
                <Form.Control
                  type="password"
                  name="confirmPassword"
                  value={passwords.confirmPassword}
                  onChange={handleChange}
                  className="label-newline"
                  style={{ borderColor: "#E4BD5B", borderWidth:"3px" }}
                />
              </Col>
            </Form.Group>
            <Button
              variant="primary"
              style={{ backgroundColor: "#E4BD5B", color: "#522A83", borderRadius:"20px" }}
              type="submit"
            >
              Submit
            </Button>{" "}
            <Button
              variant="secondary"
              style={{ backgroundColor: "#FFFFFF", color: "#E4BD5B", borderRadius:"20px" }}
              onClick={handleCancel}
            >
              Cancel
            </Button>
          </Form>
        </Col>
        <Col>
          <img src={BannerImage} alt="About" className="about-image" />
        </Col>
      </Row>
    </Container>
  );
}
