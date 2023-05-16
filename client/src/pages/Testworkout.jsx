import React from 'react';
import { useQuery } from '@apollo/client';
import { useContext } from 'react';
import { AuthContext } from '../utils/authContext';
import { QUERY_WORKOUT } from '../GraphQL/openAIQueries';
import Button from 'react-bootstrap/Button';

export default function TestWorkout() {
  const { user } = useContext(AuthContext);

  const { data, loading, error, refetch } = useQuery(QUERY_WORKOUT, {
    variables: { id: user.id },
  });

  const handleFetchWorkout = async () => {
    try {
      await refetch();
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error! {error.message}</div>;
  }

  const workoutPlan = data.userWorkoutPlan.workoutPlan;

  return (
    <div>
      <p>TestQuery = Workout</p>
      <p>{workoutPlan}</p>
      <Button variant="primary" onClick={handleFetchWorkout}>
        Fetch Workout
      </Button>
    </div>
  );
}
