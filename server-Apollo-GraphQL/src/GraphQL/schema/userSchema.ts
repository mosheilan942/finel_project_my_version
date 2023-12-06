export const userTypeDefs = `
type User {
    userid: ID
    name: String
    email: String!
    password: String!
    contactNumber: Int
    payment: String
    address: Address
  }
  
  type Address {
    country: String
    city: String
    street: String
    zip_code: String
  }
  
  type Query {
    getAllUsers: [User]
    getUser(userid: ID!): User
    getUserByEmail(email: String!): User
  }
  
  type Mutation {
    addUser(user: UserInput): User
  }
  
  input UserInput {
    userid: ID
    name: String
    email: String!
    password: String!
    contactNumber: Int
    payment: String
    address: AddressInput
  }
  
  input AddressInput {
    country: String
    city: String
    street: String
    zip_code: String
  }
  
`;