import React from 'react';
import { useQuery } from '@apollo/client';
import { useContext } from 'react';
import { AuthContext } from '../utils/authContext';
import { QUERY_MEAL } from '../GraphQL/openAIQueries';
import Button from 'react-bootstrap/Button';

export default function TestWorkout() {
  const { user } = useContext(AuthContext);

  const { data, loading, error, refetch } = useQuery(QUERY_MEAL, {
    variables: { id: user.id },
  });

  const handleFetchMeal = async () => {
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

  const mealPlan = data.userMealPlan.mealPlan;

  return (
    <div>
      <p>Meal</p>
      <p>{mealPlan}</p>
      <Button variant="primary" onClick={handleFetchMeal}>
        Fetch Meal
      </Button>
    </div>
  );
}
