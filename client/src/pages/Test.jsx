import { useState } from 'react';
import { Tab, Nav } from 'react-bootstrap';
import { FaDumbbell, FaUtensils } from 'react-icons/fa';
import { FETCH_WORKOUT, FETCH_MEAL } from '../GraphQL/openAIMutations';
import { QUERY_WORKOUT, QUERY_MEAL } from '../GraphQL/openAIQueries';
import { useMutation, useQuery } from '@apollo/client';

export default function Test() {
  const [fetchWorkout] = useMutation(FETCH_WORKOUT);
  const [fetchMeal] = useMutation(FETCH_MEAL);
  const { data: cachedWorkoutData } = useQuery(QUERY_WORKOUT);
  const { data: cachedMealData } = useQuery(QUERY_MEAL);
  const [workoutData, setWorkoutData] = useState(
    cachedWorkoutData?.userWorkoutPlan?.workoutPlan || null
  );
  const [mealData, setMealData] = useState(
    cachedMealData?.userMealPlan?.mealPlan || null
  );

  const handleButtonClick = async (eventKey) => {
    try {
      if (eventKey === 'first') {
        if (!workoutData) {
          const { data } = await fetchWorkout();
          setWorkoutData(data?.workoutPlan);
        }
      } else if (eventKey === 'second') {
        if (!mealData) {
          const { data } = await fetchMeal();
          setMealData(data?.mealPlan);
        }
      }
    } catch (error) {
      console.log('Error:', error);
    }
  };

  const loremText = `... (your Lorem Ipsum text) ...`;
  const paragraphs = loremText.split('\n\n');

  return (
    <Tab.Container defaultActiveKey="first">
      <Nav variant="tabs">
        <Nav.Item>
          <Nav.Link eventKey="first">
            <button onClick={() => handleButtonClick('first')}>
              <FaDumbbell /> Workout
            </button>
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="second">
            <button onClick={() => handleButtonClick('second')}>
              <FaUtensils /> Meal
            </button>
          </Nav.Link>
        </Nav.Item>
      </Nav>
      <Tab.Content>
        <Tab.Pane eventKey="first">
          {workoutData
            ? workoutData
                .split('\n\n')
                .map((paragraph, index) => <p key={index}>{paragraph}</p>)
            : paragraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
        </Tab.Pane>
        <Tab.Pane eventKey="second">
          {mealData
            ? mealData
                .split('\n\n')
                .map((paragraph, index) => <p key={index}>{paragraph}</p>)
            : paragraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
        </Tab.Pane>
      </Tab.Content>
    </Tab.Container>
  );
}
