import { gql } from '@apollo/client';

const QUERY_WORKOUT = gql`
  query queryWorkout($id: ID!) {
    userWorkoutPlan(id: $id) {
      workoutPlan
    }
  }
`;

const QUERY_MEAL = gql`
  query queryMeal($id: ID!) {
    userMealPlan(id: $id) {
      mealPlan
    }
  }
`;

export { QUERY_WORKOUT, QUERY_MEAL };
