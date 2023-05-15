import { Accordion, Card, Spinner, Container, Row, Col } from 'react-bootstrap';
import { useAccordionButton } from 'react-bootstrap/AccordionButton';
import { FETCH_WORKOUT, FETCH_MEAL } from '../../GraphQL/openAIMutations';
import { useMutation } from '@apollo/client';

// Helper Function for custom Accordion toggle
function CustomToggle({ children, eventKey, onClick }) {
  const decoratedOnClick = useAccordionButton(eventKey, () => {
    console.log('clicked!');
    onClick();
  });

  return (
    <button type="button" className="accordion-btn" onClick={decoratedOnClick}>
      {children}
    </button>
  );
}

export default function AccordionTest() {
  const [
    fetchWorkout,
    { loading: workoutLoading, error: workoutError, data: workoutData },
  ] = useMutation(FETCH_WORKOUT);

  const [
    fetchMeal,
    { loading: mealLoading, error: mealError, data: mealData },
  ] = useMutation(FETCH_MEAL);

  const handleWorkoutClick = async () => {
    try {
      await fetchWorkout();
    } catch (error) {
      console.log(error);
    }
  };

  const handleMealClick = async () => {
    try {
      await fetchMeal();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container className="accordion-container">
      <Accordion defaultActiveKey="0">
        <Row>
          <Card className="accordion accordion-text accordion-card ">
            <Card.Header className="card-header">
              <CustomToggle eventKey="0" onClick={handleWorkoutClick}>
                Read workout here
              </CustomToggle>
            </Card.Header>
            <Accordion.Collapse eventKey="0">
              <Card.Body className="accordion-text">
                {workoutLoading && (
                  <Spinner
                    as="span"
                    className="spinner"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                )}
                {workoutError && <p>Error fetching workout</p>}
                {workoutData && (
                  <>
                    {workoutData.fetchWorkoutMutation.workoutPlan
                      .split('Day')
                      .map((day, index) => (
                        <p key={index} style={{ marginBottom: '1rem' }}>
                          {index > 0 && <br />}
                          {day.trim()}
                        </p>
                      ))}
                  </>
                )}
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Row>
        <Row>
          <Card className="accordion accordion-text accordion-card ">
            <Card.Header className="card-header">
              <CustomToggle eventKey="1" onClick={handleMealClick}>
                Read meal here
              </CustomToggle>
            </Card.Header>
            <Accordion.Collapse eventKey="1">
              <Card.Body>
                {mealLoading && (
                  <Spinner
                    as="span"
                    className="spinner"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                )}
                {mealError && <p>Error fetching meal</p>}
                {mealData && (
                  <>
                    {mealData.fetchMealMutation.mealPlan
                      .split('Day')
                      .map((day, index) => (
                        <p key={index} style={{ marginBottom: '1rem' }}>
                          {index > 0 && <br />}
                          {day.trim()}
                        </p>
                      ))}
                  </>
                )}
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Row>
      </Accordion>
    </Container>
  );
}
