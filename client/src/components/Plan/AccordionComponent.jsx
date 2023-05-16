import { Accordion, Button, Container } from 'react-bootstrap';
import Workout from './Workout';
import Meal from './Meal';

export default function AccordionComponent() {
  return (
    <Container className="accordion-container">
      <Accordion>
        <Accordion.Item eventKey="0" className="accordion-card">
          <Accordion.Header className="accordion-header">
            <Button variant="light" className="accordion-btn">
              Workout
            </Button>
          </Accordion.Header>
          <Accordion.Body className="accordion-text">
            <Workout />
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1" className="accordion-card">
          <Accordion.Header>
            <Button variant="light" className="accordion-btn">
              Meal
            </Button>
          </Accordion.Header>
          <Accordion.Body className="accordion-text">
            <Meal />
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </Container>
  );
}
