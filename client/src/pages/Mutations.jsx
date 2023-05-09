import { useMutation, useQuery } from '@apollo/client';
import { FETCH_WORKOUT } from '../GraphQL/openAIMutations';
import { QUERY_WORKOUT } from '../GraphQL/openAIQueries';
import { FaSpinner } from 'react-icons/fa';
import { useState } from 'react';

export default function Mutations() {
  const [fetchWorkout] = useMutation(FETCH_WORKOUT);
  const { data: cachedWorkoutData, loading, error } = useQuery(QUERY_WORKOUT);
  const [workoutData, setWorkoutData] = useState(
    cachedWorkoutData?.userWorkoutPlan?.workoutPlan || null
  );

  if (loading) {
    return <FaSpinner className="spinner" />;
  }

  const handleButtonClick = async () => {
    try {
      if (!workoutData) {
        const { data } = await fetchWorkout();
        setWorkoutData(data?.workoutPlan);
      }
    } catch (error) {
      console.log('Error:', error);
    }
  };

  return (
    <div>
      <h2>Mutations</h2>
      <p>
        <button onClick={handleButtonClick}>Generate Workout</button>
      </p>
      {workoutData && (
        <div>
          <h3>Workout Plan</h3>
          <p>{workoutData}</p>
        </div>
      )}
    </div>
  );
}
