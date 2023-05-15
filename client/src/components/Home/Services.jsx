import { Container, Row, Col } from 'react-bootstrap';
import Workout from '../../assets/workout.png';
import Meal from '../../assets/meal.png';
import Tracker from '../../assets/tracker.png';

export default function Services() {
  return (
    <Container fluid className="services-container" id="services">
      <Row>
        <Col>
          <h1 className="services-title">Key Features</h1>
        </Col>
      </Row>
      <Row className="services-content">
        <Col className="service">
          <img src={Workout} alt="Service 1" className="service-image" />
          <p className="service-text">
            Get Personalized Workout Plans <br /> Tailored To Your Needs
          </p>
        </Col>
        <Col className="service">
          <img src={Meal} alt="Service 2" className="service-image" />
          <p className="service-text">
            Receive Curated Meal Plans <br /> For A Nutrious and Healthy Diet
          </p>
        </Col>
        <Col className="service">
          <img src={Tracker} alt="Service 3" className="service-image" />
          <p className="service-text">
            Track Your Fitness Journey <br /> With Detailed Progress reports
          </p>
        </Col>
      </Row>
    </Container>
  );
}
