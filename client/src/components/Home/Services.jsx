import Workout from '../../assets/workout.png';
import Meal from '../../assets/meal.png';
import Tracker from '../../assets/tracker.png';
import { Container, Row, Col } from 'react-bootstrap';

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
            Personalized workout plans <br /> tailored to your needs.
          </p>
        </Col>
        <Col className="service">
          <img src={Meal} alt="Service 2" className="service-image" />
          <p className="service-text">
            Curated meal plans <br /> for a healthy diet.
          </p>
        </Col>
        <Col className="service">
          <img src={Tracker} alt="Service 3" className="service-image" />
          <p className="service-text">
            Detailed progress reports to <br /> track your fitness journey.
          </p>
        </Col>
      </Row>
    </Container>
  );
}
