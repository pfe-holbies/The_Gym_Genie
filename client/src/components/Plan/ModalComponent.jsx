import { Modal, Container, Row, Col, Button, Spinner } from 'react-bootstrap';
import { useContext, useState } from 'react';
import { AuthContext } from '../../utils/authContext';

export default function ModalComponent() {
  const { user } = useContext(AuthContext);

  const [showWorkouts, setShowWorkouts] = useState(false);
  const [showMeals, setShowMeals] = useState(false);

  const handleClose = () => {
    setShowWorkouts(false);
    setShowMeals(false);
  };
  const handleShowWorkouts = () => setShowWorkouts(true);
  const handleShowMeals = () => setShowMeals(true);

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
              <Button className="btn-wish" onClick={handleShowWorkouts}>
                Get workouts
              </Button>
              <Modal
                show={showWorkouts}
                onHide={handleClose}
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
                  <Button className="btn-modal" onClick={handleClose}>
                    Save Changes
                  </Button>
                </Modal.Footer>
              </Modal>
            </Col>
            <Col>
              <Button className="btn-wish" onClick={handleShowMeals}>
                Get meals
              </Button>
              <Modal
                show={showMeals}
                onHide={handleClose}
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
                  <Button className="btn-modal" onClick={handleClose}>
                    Save Changes
                  </Button>
                </Modal.Footer>
              </Modal>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
