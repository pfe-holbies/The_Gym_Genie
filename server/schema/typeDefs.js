const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLInt,
    GraphQLFloat,
    GraphQLNonNull,
    GraphQLList,
  } = require('graphql');

  // Creating a 'Diet' GraphQL object type
const Diet = new GraphQLObjectType({
    name: 'Diet',
    fields: () => ({
      id: { type: GraphQLID },
      name: { type: GraphQLString },
      description: { type: GraphQLString },
    }),
  });

// Creating a 'Workout' GraphQL object type
const Workout = new GraphQLObjectType({
  name: 'Workout',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
  }),
});

// Creating a 'User' GraphQL object type
const User = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    age: { type: GraphQLInt },
    gender: { type: GraphQLString },
    height: { type: GraphQLFloat },
    weight: { type: GraphQLFloat },
    workoutType: { type: GraphQLString },
    goal: { type: GraphQLString },
    supplements: { type: GraphQLList(GraphQLNonNull(User)) },
    workouts: { type: GraphQLList(GraphQLNonNull(Workout)) },
    diets: { type: GraphQLList(GraphQLNonNull(Diet)) },
  }),
});

// Defining a root query using 'GraphQLObjectType'
const RootQuery = new GraphQLObjectType({
    name: 'RootQuery',
    fields: () => ({
      user: {
        type: User,
        args: { id: { type: GraphQLNonNull(GraphQLID) } },
        resolve(parent, args) {
          return {
            id: args.id,
            name: 'Sample User',
            email: 'sample.user@example.com',
            age: 25,
            gender: 'Male',
            height: 175.3,
            weight: 70.5,
            workoutType: 'Strength Training',
            goal: 'Muscle Gain',
            supplements: [],
            workouts: [],
            diets: [],
          };
        },
      },
      workout: {
        type: Workout,
        args: { id: { type: GraphQLNonNull(GraphQLID) } },
        resolve(parent, args) {
          return {
            id: args.id,
            name: 'Sample Workout',
            description: 'A sample workout for demonstration purposes',
          };
        },
      },
      diet: {
        type: Diet,
        args: { id: { type: GraphQLNonNull(GraphQLID) } },
        resolve(parent, args) {
          return {
            id: args.id,
            name: 'Sample Diet',
            description: 'A sample diet for demonstration purposes',
          };
        },
      },
    }),
  });

// Defining mutations using 'GraphQLObjectType'
const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    createUser: {
      type: User,
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        email: { type: GraphQLNonNull(GraphQLString) },
        age: { type: GraphQLNonNull(GraphQLInt) },
        gender: { type: GraphQLNonNull(GraphQLString) },
        height: { type: GraphQLNonNull(GraphQLFloat) },
        weight: { type: GraphQLNonNull(GraphQLFloat) },
        workoutType: { type: GraphQLNonNull(GraphQLString) },
        goal: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args) {
        return {
          id: Date.now().toString(),
          name: args.name,
          email: args.email,
          age: args.age,
          gender: args.gender,
          height: args.height,
          weight: args.weight,
          workoutType: args.workoutType,
          goal: args.goal,
          supplements: [],
          workouts: [],
          diets: [],
        };
      },
    },
    createWorkout: {
      type: Workout,
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        description: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args) {
        return {
          id: Date.now().toString(),
          name: args.name,
          description: args.description,
        };
      },
    },
    createDiet: {
      type: Diet,
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        description: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args) {
        return {
          id: Date.now().toString(),
          name: args.name,
          description: args.description,
        };
      },
    },
  }),
});


module.exports = {
  Diet,
  Workout,
  User,
  RootQuery,
  Mutation,
};
