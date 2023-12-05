export const userTypeDefs = `
  type User {
    id: ID!
    username: String!
    email: String!
  }

  type Query {
    getUser(id: ID!): User
    getUsers: [User]
  }

  type Mutation {
    createUser(username: String!, email: String!): User
  }
`;