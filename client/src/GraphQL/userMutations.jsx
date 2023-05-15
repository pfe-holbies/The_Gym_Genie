import { gql } from '@apollo/client';

// trigger registerMutation() from backend
const REGISTER_USER = gql`
  mutation registerMutation($signupInput: registerInput!) {
    registerMutation(signupInput: $signupInput) {
      token
      createdAt
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
    }
  }
`;

// trigger loginMutation() from backend
const LOG_USER = gql`
  mutation loginMutation(
    $username: String!
    $email: String!
    $password: String!
  ) {
    loginMutation(username: $username, email: $email, password: $password) {
      id
      token
      createdAt
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
    }
  }
`;

export { REGISTER_USER, LOG_USER };
