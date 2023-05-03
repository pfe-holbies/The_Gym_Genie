import React from "react";
import BannerImage from "../Assets/home-banner-image.png";
import { Container, Row, Col, Button } from "react-bootstrap";

export default function About() {
  return (
    <Container className="about-container">
      <Row>
        <Col className="about-content">
        <hr />
          <h1 className="about-title">
            When it comes to fitness,<br/> GymGenie is the master.
          </h1>
          <p className="about-text">
            Discover GymGenie, the ultimate solution for your fitness journey.
            What sets us apart is our state-of-the-art ChatGPT powered API
            combined with Prompt Engineering which is essentially querying a
            language AI or large language model (LLM), in the most effective
            manner to get the desirable outcome.
          </p>
          <p className="about-text">
            This allows us to create personalized workouts, curated meal plans,
            and detailed progress reports specifically tailored to your unique
            fitness needs and preferences.No matter what your fitness goals are,
            whether it's to sculpt your dream body, lose weight, or gain muscle,
            GymGenie is here to make it happen.Say goodbye to sifting through AI
            inaccurate output and hello to efficient, effective fitness with
            GymGenie. Join us now.
          </p>
          <div className="about-buttons-container" style={{ marginLeft:"25%"}}>
            <Button
              href="#Join Now"
              style={{ backgroundColor: "#E4BD5B", color: "#522A83", borderRadius:"20px"}}
            >
              Join Now
            </Button>
          </div>
          <hr />
        </Col>
        <Col>
          <img src={BannerImage} alt="About" className="about-image" />
        </Col>
      </Row>
    </Container>
  );
}
