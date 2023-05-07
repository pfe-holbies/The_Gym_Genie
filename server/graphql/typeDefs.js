const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
} = require('graphql');

// Define UserType
const UserType = new GraphQLObjectType({
  name: 'User',
  description: 'User type',
  fields: () => ({
    id: { type: GraphQLString },
    username: { type: GraphQLString },
    password: { type: GraphQLString },
    email: { type: GraphQLString },
    token: { type: GraphQLString },
    age: { type: GraphQLInt },
    gender: { type: GraphQLString },
    height: { type: GraphQLInt },
    weight: { type: GraphQLInt },
    primaryGoal: { type: GraphQLString },
    activityLevel: { type: GraphQLString },
    strengthLevel: { type: GraphQLString },
    workoutType: { type: GraphQLString },
    workoutsPerWeek: { type: GraphQLInt },
    dietType: { type: GraphQLString },
    foodAllergies: { type: GraphQLString },
    workoutPlan: { type: GraphQLString },
    mealPlan: { type: GraphQLString },
    createdAt: { type: GraphQLString },
    updatedAt: { type: GraphQLString },
  }),
});

module.exports = { UserType };
