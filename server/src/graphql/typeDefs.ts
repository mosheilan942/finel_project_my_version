import { gql } from "apollo-server";

const schema = gql`
  type User {
    id: Int!
    userid: String!
    name: String!
    login_time: String!
  }

  type Query {
    user:[User]
  }
`;

export default schema