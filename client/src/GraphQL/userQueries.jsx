import { gql } from '@apollo/client';

const GET_USER = gql`
    query getUser($id: ID!) {
        getUser(id: $id) {
          id
          username
          email
          password
          token
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

export { GET_USER };