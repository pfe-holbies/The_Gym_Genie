const User = require('../../models/User');
const { UserType } = require('../schemas/userType');
const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLNonNull,
    isOutputType,
} = require('graphql');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');



// User Sign Up
const SignUp = {
    type: isOutputType,
    args: {
      username: { type: GraphQLNonNull(GraphQLString) },
      email: { type: GraphQLNonNull(GraphQLString) },
      password: { type: GraphQLNonNull(GraphQLString) }
    },
    async resolve(parent, args) {
        try{
        // Check if the user already exists
        const userExists = await User.findOne({ email: args.email });
        if (userExists) {
            throw new Error('User already exists');
        }
        // Hash the password
        const hashedPassword = await bcrypt.hash(args.password, 10);
        // Create a new user
        const newUser = new User({
            username: args.username,
            email: args.email,
            password: hashedPassword
        });
         // Save the new user to the DB
         const savedUser = await newUser.save();

         // Create a JWT token
         const token = jwt.sign({ userId: savedUser.id }, process.env.SECRET_KEY);

            // Return the user and the token
            return { ...savedUser._doc, id: savedUser._id, token };
        } catch (error) {
            throw new Error(error);
        }
    }
};

// User Sign In

/* module.exports = {
    userSignUp
  }; */