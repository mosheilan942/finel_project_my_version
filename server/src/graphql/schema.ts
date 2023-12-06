// import axios from 'axios';
// import {
//     GraphQLObjectType,
//     GraphQLInt,
//     GraphQLString,
//     GraphQLBoolean,
//     GraphQLList,
//     GraphQLSchema
// } from 'graphql';
// const banner = process.env.BANNER_BASE_URL;

// const ItamType = new GraphQLObjectType({
//     name: 'WishlistItams',
//     fields: () => ({
//         id: { type: GraphQLInt },
//         name: { type: GraphQLString },
//         saleprice: { type: GraphQLInt },
//         quantity: { type: GraphQLInt },
//         description: { type: GraphQLString },
//         category: { type: GraphQLString },
//         discountPercentage: { type: GraphQLInt },
//         rating: { type: GraphQLInt },
//         click: { type: GraphQLInt },
//         image: { type: ImageType },
//     })
// });

// const ImageType = new GraphQLObjectType({
//     name: 'imageProp',
//     fields: () => ({
//         url: { type: GraphQLString }, 
//         alt: { type: GraphQLString }, 
//     })
// });

// // Root Query
// const RootQuery = new GraphQLObjectType({
//     name: 'RootQueryType',
//     fields: {
//         WishlistItams: {
//             type: new GraphQLList(ItamType),
//             resolve: async (parent, args) => {
//                 try {
//                     const { data } = await axios.post(`${banner}/ext/bannersProduct/top5/products`);
//                     console.log(data);
//                     return data;
//                 } catch (error) {
//                     console.error('Error fetching wishlist items:', error);
//                     throw error; 
//                 }
//             }
//         },
//     }
// });

// export const schema = new GraphQLSchema({
//     query: RootQuery
// });
