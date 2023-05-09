import { useState } from 'react';
import { FETCH_WORKOUT } from '../../GraphQL/openAIMutations';
import { QUERY_WORKOUT } from '../..//GraphQL/openAIQueries';
import { useMutation, useQuery } from '@apollo/client';
import { FaSpinner } from 'react-icons/fa';

export default function Workouts() {
  const [fetchWorkout] = useMutation(FETCH_WORKOUT);
  const { data: cachedWorkoutData, loading, error } = useQuery(QUERY_WORKOUT);

  if (loading) {
   return <FaSpinner className="spinner" />;
  }

  if (error) {
    return <div>Error! {error.message}</div>;
  }

  const workoutPlan = cachedWorkoutData?.userWorkoutPlan?.workoutPlan || null;

  const [workoutData, setWorkoutData] = useState(workoutPlan);

  const handleButtonClick = async (eventKey) => {
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
      <h2>Workouts</h2>
      <p>
        <button onClick={handleButtonClick}>Generate Workout</button>
      </p>
      {workoutData && (
        <div>
          <h3>Workout Plan</h3>
          <p>{workoutData}</p>
             <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam arcu ipsum, convallis non sapien at, tempus tempor tortor. Aliquam lectus augue, rutrum placerat magna non, vulputate aliquam arcu. Aliquam semper eros eu mollis lacinia. Nunc sapien ante, viverra vel mollis vel, dictum at purus. Fusce molestie ipsum elit, consectetur commodo est ullamcorper a. Aliquam magna nisl, tincidunt sit amet turpis eu, euismod aliquam augue. Maecenas varius nulla sodales ligula tristique venenatis. Aliquam pretium hendrerit erat, condimentum eleifend velit dignissim vitae. Nunc sodales lacinia lectus eget sagittis. Sed malesuada sollicitudin vestibulum. Donec convallis sit amet sapien et blandit. Suspendisse dictum elit id erat ultrices, nec consequat sem eleifend. Donec vehicula risus est, quis rhoncus lacus aliquam id. Sed scelerisque viverra auctor. Aenean posuere accumsan mauris vel placerat. Phasellus tempus, risus convallis lobortis tincidunt, massa nisl congue dolor, id consectetur est neque a quam. </p>
        </div>
       
      )}
    </div>
  );
}
