import { buildSchema } from 'graphql';

export default buildSchema(`
type User {
    _id : ID!
    name : String!
    email : String!
    password : String!
}

type LoginResponse {
    token : String!
}

input InputLogin {
    email : String!
    password : String!
}

input InputRegister {
    name : String!
    email : String!
    password : String!
}

type RootQuery {
    users : [User!]!
    profile: User!
    login(inputLogin : InputLogin) : LoginResponse!
}

type RootMutation {
    register(inputRegister : InputRegister) : User!
}

schema {
    query: RootQuery
    mutation: RootMutation
}
`);