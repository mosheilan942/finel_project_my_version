const typeDefs = `#graphql
# Comments in GraphQL strings (such as this one) start with the hash (#) symbol.
# This "Book" type defines the queryable fields for every book in our data source.
enum genreType {
    Mystery
    Fantasy
    Classic
    Fiction
  }


type Address {
    country: String;
    city: String
    street: String
    cellPhone: String
    zipCode: String
    saveAddress: boolean
}


# The "Query" type is special: it lists all of the available queries that
# clients can execute, along with the return type for each. In this
# case, the "books" query returns an array of zero or more Books (defined above).

type Query {
    user(id:Int!): [Address]
}

type Mutation {
    addBook(input: addBook): Book
  }
`;
export default typeDefs




