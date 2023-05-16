import React, { useState } from 'react';
import { FETCH_WORKOUT, FETCH_MEAL } from '../GraphQL/openAIMutations';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../utils/authContext';
import { Modal, Button, Spinner } from 'react-bootstrap';

export default function TestMutation() {
  const { user } = useContext(AuthContext);

  const [
    fetchWorkout,
    { loading: workoutLoading, error: workoutError, data: workoutData },
  ] = useMutation(FETCH_WORKOUT);
  const [
    fetchMeal,
    { loading: mealLoading, error: mealError, data: mealData },
  ] = useMutation(FETCH_MEAL);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate(); // useNavigate hook for navigation

  const handleWorkoutClick = async () => {
    try {
      setShowModal(true);
      await fetchWorkout();
      if (workoutData) {
        console.log('workoutData fetched!');
        navigate('/query');
      }
    } catch (error) {
      console.log(error);
    } finally {
      setShowModal(false);
    }
  };

  const handleMealClick = async () => {
    try {
      setShowModal(true);
      await fetchMeal();
      if (mealData) {
        console.log('mealData fetched!');
        navigate('/query');
      }
    } catch (error) {
      console.log(error);
    } finally {
      setShowModal(false);
    }
  };

  return (
    <div>
      <p>Workout</p>
      <Button onClick={handleWorkoutClick}>Fetch Workout</Button>
      <p>{workoutLoading && 'Loading...'}</p>
      <p>{workoutError && 'Error :( Please try again'}</p>
      <p>{workoutData && 'Workout Fetched'}</p>
      <p>Meal</p>
      <Button onClick={handleMealClick}>Fetch Meal</Button>
      <p>{mealLoading && 'Loading...'}</p>
      <p>{mealError && 'Error :( Please try again'}</p>
      <p>{mealData && 'Meal Fetched'}</p>

      {/* Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Loading...</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Spinner animation="border" />
        </Modal.Body>
      </Modal>
    </div>
  );
}
