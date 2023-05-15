import { gql } from '@apollo/client';

// trigger userWorkoutPlan() from backend
const QUERY_WORKOUT = gql`
  query queryWorkout($id: ID!) {
    userWorkoutPlan(id: $id) {
      workoutPlan
    }
  }
`;

// trigger userMealPlan() from backend
const QUERY_MEAL = gql`
  query queryMeal($id: ID!) {
    userMealPlan(id: $id) {
      mealPlan
    }
  }
`;

export { QUERY_WORKOUT, QUERY_MEAL };
