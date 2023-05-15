import { gql } from '@apollo/client';

// trigger fetchWorkoutMutation() from backend
const FETCH_WORKOUT = gql`
  mutation fetchWorkoutMutation {
    fetchWorkoutMutation {
      username
      workoutPlan
    }
  }
`;

// trigger fetchMealMutation() from backend
const FETCH_MEAL = gql`
  mutation fetchMealMutation {
    fetchMealMutation {
      mealPlan
    }
  }
`;

export { FETCH_WORKOUT, FETCH_MEAL };
