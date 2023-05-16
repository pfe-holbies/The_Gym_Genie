import { useQuery } from '@apollo/client';
import { useContext } from 'react';
import { AuthContext } from '../../utils/authContext';
import { QUERY_WORKOUT } from '../../GraphQL/openAIQueries';
import { Button, Spinner } from 'react-bootstrap';
import React, { useState } from 'react';

export default function Workout() {
  const { user } = useContext(AuthContext);

  const { data, loading, error, refetch } = useQuery(QUERY_WORKOUT, {
    variables: { id: user.id },
  });

  const [fetchComplete, setFetchComplete] = useState(false);

  const handleFetchWorkout = async () => {
    try {
      await refetch();
      setFetchComplete(true);
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return (
      <div>
        <Button variant="primary" onClick={handleFetchWorkout}>
          Fetch Meal
        </Button>
        <Spinner
          as="span"
          className="spinner"
          animation="border"
          size="sm"
          role="status"
          aria-hidden="true"
        />
      </div>
    );
  }

  if (error) {
    return <div>Error! {error.message}</div>;
  }

  const workoutPlan = data.userWorkoutPlan.workoutPlan;

  return (
    <div>
      <Button onClick={handleFetchWorkout} className="accordion-btn ">
        Read workout here
      </Button>
      {fetchComplete &&
        workoutPlan.split('Day').map((day, index) => (
          <p key={index} style={{ marginBottom: '1rem' }}>
            {index > 0 && <br />}
            {day.trim()}
          </p>
        ))}
    </div>
  );
}
