import GymGenie from '../../assets/GymGenie.png';
import { Row, Col, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function About() {
  return (
    <Container className="about-container" id="about">
      <Row className="container1"></Row>
      <Row>
        <Col className="container2 my-5 mb-5">
          <Container>
            <Row>
              <Col>
                <h1 className="about-title">
                  Meet <span className="text-highlight">GymGenie</span> your
                  personal trainer, nutritionist and motivator.
                </h1>
                <p className="about-text">
                  Discover GymGenie, the ultimate solution for your fitness
                  journey. What sets us apart is our state-of-the-art ChatGPT
                  powered API combined with Prompt Engineering which is
                  essentially querying a language AI or large language model
                  (LLM), in the most effective manner to get the desirable
                  outcome.
                </p>
                <p className="about-text">
                  This allows us to create personalized workouts, curated meal
                  plans, and detailed progress reports specifically tailored to
                  your unique fitness needs and preferences.No matter what your
                  fitness goals are, whether it's to sculpt your dream body,
                  lose weight, or gain muscle, GymGenie is here to make it
                  happen.Say goodbye to sifting through AI inaccurate output and
                  hello to efficient, effective fitness with GymGenie. Join us
                  now.
                </p>
                <Link
                  to="/register"
                  className="btn btn-learn btn-signup btn-hover"
                >
                  Learn More
                </Link>
                <hr className="hr-about" />
              </Col>
              <Col>
                <img src={GymGenie} className="about-img mt-0" />
              </Col>
            </Row>
          </Container>
        </Col>
      </Row>
    </Container>
  );
}
