const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLList,
  GraphQLNonNull,
  GraphQLScalarType,
} = require("graphql");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { UserType } = require("../schemas/TypeDefs/UserType");
const User = require("../models/User");

const SECRET_KEY = process.env.SECRET_KEY;

// Define the Mutation
const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    //  signUp Mutation Tested
    signUp: {
      type: UserType,
      args: {
        username: { type: GraphQLNonNull(GraphQLString) },
        email: { type: GraphQLNonNull(GraphQLString) },
        password: { type: GraphQLNonNull(GraphQLString) },
      },
      async resolve(parent, args) {
        try {
          // Check if the user already exists
          const userExists = await User.findOne({ email: args.email });
          if (userExists) {
            throw new Error("User already exists");
          }

          // Hash the password
          const hashedPassword = await bcrypt.hash(args.password, 10);

          // Create a new user object
          const newUser = new User({
            username: args.username,
            email: args.email,
            password: hashedPassword,
          });

          // Save the new user to the DB
          const savedUser = await newUser.save();

          // Create a JWT token
          const token = jwt.sign({ userId: savedUser.id }, SECRET_KEY);
          console.log(token);
          // Return the new user and token
          return { ...savedUser._doc, id: savedUser._id, token };
        } catch (err) {
          throw new Error(err);
        }
      },
    },
    // Login Mutation tested
    logIn: {
      type: UserType,
      args: {
        username: { type: GraphQLNonNull(GraphQLString) },
        email: { type: GraphQLNonNull(GraphQLString) },
        password: { type: GraphQLNonNull(GraphQLString) },
      },
      async resolve(parent, args) {
        try {
          // Check if user with the provided email exists
          const user = await User.findOne({ email: args.email });
          if (!user) {
            throw new Error("User with the provided email does not exist");
          }
          // compare the provided password with the password in the DB
          const validPassword = await bcrypt.compare(
            args.password,
            user.password
          );
          if (!validPassword) {
            throw new Error("Invalid password");
          }
          // Create a JWT token
          const token = jwt.sign({ userId: user.id }, SECRET_KEY);
          console.log(token);
          // Return the user and token
          return { ...user._doc, id: user._id, token };
        } catch (err) {
          throw new Error(err);
        }
      },
    },
    // Logout Mutation
    logOut: {
      type: UserType,
      args: {
        userId: { type: GraphQLNonNull(GraphQLID) },
      },
      async resolve(parent, args) {
        try {
          // Find the user by ID and set their token to null
          const user = await User.findById(args.userId);
          user.token = null;
          await user.save();

          // Return the updated user
          return { ...user._doc, id: user._id };
        } catch (err) {
          throw new Error(err);
        }
      },
    },
  },
});

module.exports = { Mutation };
