import { Modal, Container, Row, Col, Button, Spinner } from 'react-bootstrap';
import { useContext, useState } from 'react';
import { AuthContext } from '../../utils/authContext';
import { FETCH_WORKOUT, FETCH_MEAL } from '../../GraphQL/openAIMutations';
import { useMutation } from '@apollo/client';

export default function ModalComponent() {
  const { user } = useContext(AuthContext);

  const [
    fetchWorkout,
    { loading: workoutLoading, error: workoutError, data: workoutData },
  ] = useMutation(FETCH_WORKOUT);

  const [
    fetchMeal,
    { loading: mealLoading, error: mealError, data: mealData },
  ] = useMutation(FETCH_MEAL);

  const [showWorkoutModal, setShowWorkoutModal] = useState(false);
  const [showMealModal, setShowMealModal] = useState(false);

  const handleWorkoutClick = async () => {
    try {
      setShowWorkoutModal(true);
      await fetchWorkout();
      if (workoutData) {
        console.log('workoutData fetched!');
      }
    } catch (error) {
      console.log(error);
    } finally {
      setShowWorkoutModal(false);
    }
  };

  const handleMealClick = async () => {
    try {
      setShowMealModal(true);
      await fetchMeal();
      if (mealData) {
        console.log('mealData fetched!');
      }
    } catch (error) {
      console.log(error);
    } finally {
      setShowMealModal(false);
    }
  };

  if (user) {
    return (
      <div>
        <Container
          fluid
          className="jumbotron modal-img d-flex flex-column align-items-center justify-content-center"
        >
          <Row>
            <h1 className="text-white display-5 welcome-text1">ABRACADABRA!</h1>
          </Row>
          <Row>
            <h1 className="text-white display-1 welcome-text2 ">
              Master {user.username} make a wish!{' '}
            </h1>
          </Row>
          <Row>
            <h2 className="text-white welcome-text3">
              YOUR FITNESS IS MY COMMAND
            </h2>
          </Row>

          <Row xs={2} md={3} lg={8}>
            <Col>
              <Button className="btn-wish" onClick={handleWorkoutClick}>
                Get workouts
              </Button>
              <Modal
                show={showWorkoutModal}
                onHide={() => setShowWorkoutModal(false)}
                className="custom-modal"
              >
                <Modal.Header closeButton>
                  <Modal.Title className="d-flex align-items-center justify-content-center ms-4">
                    Getting your workouts plan {user.username} from OpenAI
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <div className="d-flex align-items-center justify-content-center">
                    <Spinner
                      className="spinner"
                      animation="border"
                      role="status"
                    ></Spinner>
                  </div>
                </Modal.Body>
                <Modal.Footer>
                  <p>{workoutData && 'Workout Fetched'}</p>
                </Modal.Footer>
              </Modal>
            </Col>
            <Col>
              <Button className="btn-wish" onClick={handleMealClick}>
                Get meals
              </Button>
              <Modal
                show={showMealModal}
                onHide={() => setShowMealModal(false)}
                className="custom-modal"
              >
                <Modal.Header closeButton>
                  <Modal.Title className="d-flex align-items-center justify-content-center ms-4">
                    Getting your meals plan {user.username} from OpenAI
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <div className="d-flex align-items-center justify-content-center">
                    <Spinner
                      className="spinner"
                      animation="border"
                      role="status"
                    ></Spinner>
                  </div>
                </Modal.Body>
                <Modal.Footer>
                  {mealData && <p>Meal Plan is fetched</p>}
                </Modal.Footer>
              </Modal>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
