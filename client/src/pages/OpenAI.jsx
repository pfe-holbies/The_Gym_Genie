import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

export default function OpenAI() {
  const [showWorkoutsModal, setShowWorkoutsModal] = useState(false);
  const [showMealsModal, setShowMealsModal] = useState(false);

  const handleWorkoutsModalClose = () => setShowWorkoutsModal(false);
  const handleMealsModalClose = () => setShowMealsModal(false);

  return (
    <>
      <div className="header-img" id="header">
        <div className="home-banner-container">
          <div className="home-text-section">
            <h2 className="home-text-section mt-5 ms-5 home-text-highlight">ABRACADABRA</h2>
            <p className="home-text">
              Oh great and powerful master, welcome!
              I am <span className="home-text-highlight">GymGenie</span> of the Lamp, at your service!
              <br />
              Just tell me what you desire, and I shall make it come true.
              Whether it be six-pack abs, attractive body or big muscles, I can make it happen!
              So press the buttons and receive your wishes, and let's make AI magic together!
            </p>
            <hr className="hr-style" />
            <Button  className="btn-learn" onClick={() => setShowWorkoutsModal(true)}>
              Workouts
            </Button>
            <Button className="btn-learn" onClick={() => setShowMealsModal(true)}>
              Meals
            </Button>
          </div>
        </div>
      </div>
      <Modal show={showWorkoutsModal} onHide={handleWorkoutsModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Workouts Modal</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Modal content for workouts goes here.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button className="btn-signup" onClick={handleWorkoutsModalClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showMealsModal} onHide={handleMealsModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Meals Modal</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Modal content for meals goes here.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button className="btn-signup" onClick={handleMealsModalClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
