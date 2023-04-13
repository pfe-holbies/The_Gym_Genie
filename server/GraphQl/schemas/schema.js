require('dotenv').config();
const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLList,
    GraphQLNonNull,
    GraphQLScalarType,
} = require('graphql');

const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY;


//Adding Time and Date stamps
const DateTime = new GraphQLScalarType({
    name: 'DateTime',
    description: 'A date and time, represented as an ISO-8601 string',
    serialize(value) {
      return value.toISOString();
    },
    parseValue(value) {
      return new Date(value);
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.STRING) {
        return new Date(ast.value);
      }
      return null;
    },
});

// Define the UserType
const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: { type: GraphQLID },
        username: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
        createdAt: { type: DateTime },
        updatedAt: { type: DateTime },
        token: { type: GraphQLString },
    })
});

// Define the RootQuery
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        // Query for a single user
        user: {
            type: UserType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return User.findById(args.id);
            }
        },
        // Query for all users
        users: {
            type: new GraphQLList(UserType),
            resolve(parent, args) {
                return User.find({});
            }
        }
    }
});

// Define the Mutation
const Mutation = new GraphQLObjectType({
    name: 'Mutation',
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
                        throw new Error('User already exists');
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
                    console.log(token)
                    // Return the new user and token
                    return { ...savedUser._doc, id: savedUser._id, token };
                } catch (err) {
                    throw new Error(err);
                }
            }
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
                        throw new Error('User does not exist');
                    }
                    // compate the password
                    const validPassword = await bcrypt.compare(args.password, user.password);
                    if (!validPassword) {
                        throw new Error('Invalid password');
                    }
                    
                    // Create a JWT token
                    const token = jwt.sign(
                        { userId: user.id }, 
                        process.env.SECRET_KEY, 
                        {
                        expiresIn: '1h',
                        });
                    // Return the user and token
                    console.log(`Welcome back, ${user.username}! you are logged in`);
                    console.log(`${user.username} is authenticated, token: ${token}`);
                    return { user, token };
                } catch (err) {
                    throw new Error(err);
                }
            }
        },

        // LogOut Mutation TBD
       /*  logout: {
            type: GraphQLString,
            resolve(parent, args) {
                // TODO: Implement logout functionality
                return 'Logged Out Successfully';
            }
        },
 */
        // Mutation for updating a user Tested
        updateUser: {
            type: UserType,
            args: {
                id: { type: GraphQLNonNull(GraphQLID) },
                username: { type: GraphQLNonNull(GraphQLString) },
                email: { type: GraphQLNonNull(GraphQLString) },
                password: { type: GraphQLNonNull(GraphQLString) },
            },
            async resolve(parent, args) {
                try {
                    // Hash the password
                    const hashedPassword = await bcrypt.hash(args.password, 10);

                    // Update the user
                    const updatedUser = await User.findByIdAndUpdate(
                        args.id,
                        {
                            $set: {
                                username: args.username,
                                email: args.email,
                                password: hashedPassword,
                            }
                        },
                        { new: true }
                    );

                    return updatedUser;
                } catch (err) {
                    throw new Error(err);
                }
            }
        },
        // Mutation for deleting a user Tested
        deleteUser: {
            type: UserType,

            args: { 
                id: { type: GraphQLNonNull(GraphQLID) } 
            },
            async resolve(parent, args) {
                try {
                    // Check if the user exists
                    const userExists = await User.findById(args.id);
                    if (!userExists) {
                        throw new Error('User does not exist');
                    }
                    // Delete the user from the DB
                    const deletedUser = await User.findByIdAndDelete(args.id);
                    return deletedUser;
                }
                catch (err) {
                    throw new Error(err);
                }
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});
