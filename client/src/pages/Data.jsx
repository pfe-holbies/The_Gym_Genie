import { useQuery } from '@apollo/client';
import { QUERY_WORKOUT, QUERY_MEAL } from '../GraphQL/openAIQueries';
import { GET_USER } from '../GraphQL/userQueries';

export default function Data() {
  const {
    data: workoutData,
    loading,
    error,
  } = useQuery(QUERY_WORKOUT, {
    variables: { id: '6458a2f6a0687fa0545ee643' },
  });

  const { data: mealData } = useQuery(QUERY_MEAL, {
    variables: { id: '6458a2f6a0687fa0545ee643' },
  });

  const { data: userData } = useQuery(GET_USER, {
    variables: { id: '6458a2f6a0687fa0545ee643' },
  });

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error! {error.message}</div>;
  }

  console.log(workoutData);
  console.log(mealData);
  //console.log(userData);

  return <div>{workoutData.userWorkoutPlan.workoutPlan}</div>;
}
