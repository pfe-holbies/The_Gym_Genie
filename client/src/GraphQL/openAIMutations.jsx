import { gql } from '@apollo/client';

const FETCH_WORKOUT = gql`
  mutation fetchWorkoutMutation {
    fetchWorkoutMutation
  }
`;

const FETCH_MEAL = gql`
  mutation fetchMealMutation {
    fetchMealMutation
  }
`;

export { FETCH_WORKOUT, FETCH_MEAL };
