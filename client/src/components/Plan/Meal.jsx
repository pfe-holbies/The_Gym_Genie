import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { useContext } from 'react';
import { AuthContext } from '../../utils/authContext';
import { QUERY_MEAL } from '../../GraphQL/openAIQueries';
import Button from 'react-bootstrap/Button';

export default function MealCard() {
  const { user } = useContext(AuthContext);
  const [fetchComplete, setFetchComplete] = useState(false);

  const { data, loading, error, refetch } = useQuery(QUERY_MEAL, {
    variables: { id: user.id },
  });

  const handleFetchMeal = async () => {
    try {
      await refetch();
      setFetchComplete(true);
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
      <Button className="accordion-btn" onClick={handleFetchMeal}>
        Read meal here
      </Button>
      {fetchComplete &&
        mealPlan.split('Day').map((day, index) => (
          <p key={index} style={{ marginBottom: '1rem' }}>
            {index > 0 && <br />}
            {day.trim()}
          </p>
        ))}
    </div>
  );
}
