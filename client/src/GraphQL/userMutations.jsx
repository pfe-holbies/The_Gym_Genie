import { gql } from '@apollo/client';

const REGISTER_USER = gql`
     mutation registerMutation(
        $username: String!, 
        $email: String!, 
        $password: String!,
        $age: Int!,
        $gender: String!,
        $height: Int!,
        $weight: Int!,
        $primaryGoal: String!,
        $activityLevel: String!,
        $strengthLevel: String!,
        $workoutType: String!,
        $workoutsPerWeek: Int!,
        $dietType: String!,
        $foodAllergies: String!
    ) {
        registerMutation(
            username: $username,
            email: $email,
            password: $password,
            age: $age,
            gender: $gender,
            height: $height,
            weight: $weight,
            primaryGoal: $primaryGoal,
            activityLevel: $activityLevel,
            strengthLevel: $strengthLevel,
            workoutType: $workoutType,
            workoutsPerWeek: $workoutsPerWeek,
            dietType: $dietType,
            foodAllergies: $foodAllergies
        ) 
    }
    

`;


export { REGISTER_USER } ;
