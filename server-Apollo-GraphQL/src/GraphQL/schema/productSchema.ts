export const productTypeDefs = `
  type Product {
    id: ID!
    name: String!
    price: Float!
    # Other fields...
  }

  type Query {
    getProduct(id: ID!): Product
    getProducts: [Product]
  }

  type Mutation {
    createProduct(name: String!, price: Float!): Product
  }
`;