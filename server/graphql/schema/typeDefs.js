// getting data using object destructuring
import { buildSchema } from "graphql";

export default buildSchema(`

type User {
    name: String!
    email: String!
    password: String!
    age: Int!
    gender: String!
    height: Int!
    weight: Int!
}


type RootQuery {
    users: [User!]!
}

type RootMutation {
    createUser(
        name: String!
        email: String!
        password: String!
        age: Int!
        gender: String!
        height: Int!
        weight: Int!
    ): User!
}

schema {
    query: RootQuery
    mutation: RootMutation
}
`);
