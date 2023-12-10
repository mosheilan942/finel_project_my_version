export const productTypeDefs = `
interface Coordinate {
  longitude1: Float!
  longitude2: Float!
  longitude3: Float!
  latitude1: Float!
  latitude2: Float!
  latitude3: Float!
}

type Image {
  url: String!
  alt: String!
}

type Tag {
  tag: String!
  tag2: String!
}

type Product {
  id: ID!
  name: String!
  saleprice: Float!
  quantity: Int!
  description: String!
  category: String!
  discount: Float!
  rating: Float!
  click: Int!
  coordinate: Coordinate!
  image: Image!
  tags: Tag!
}


type Category {
  id: String!
  name: String!
  clicked: Int!
}


type Query {
  getProductByID(id: ID!): Product
  getProductBySearch(search: String!): [Product]
  getTop5Products: [Product]
  getTop5ForCategorys: [Category]
  getCategoryByName(name: String!): Category
}
`;