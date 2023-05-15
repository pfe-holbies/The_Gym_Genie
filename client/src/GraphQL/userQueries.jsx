import { gql } from '@apollo/client';

// trigger getUser() from backend
const GET_USER = gql`
  query getUser($id: ID!) {
    getUser(id: $id) {
      id
      token
      username
      email
      password
      age
      gender
      height
      weight
      primaryGoal
      activityLevel
      strengthLevel
      workoutType
      workoutsPerWeek
      dietType
      foodAllergies
      workoutPlan
      mealPlan
    }
  }
`;

export { GET_USER };
