const { ApolloServer, gql } = require('apollo-server');

// Define the GraphQL schema
const typeDefs = gql`
  type Query {
    hello: String
  }

  type Mutation {
    uploadFile(fileName: String!, content: String!): String
  }
`;

// Define resolvers for your schema
const resolvers = {
  Query: {
    hello: () => 'Welcome to the standalone GraphQL server!',
  },
  Mutation: {
    uploadFile: (_, { fileName, content }) => {
      console.log(`File received: ${fileName}`);
      // Add your file storage logic here
      return `File ${fileName} uploaded successfully!`;
    },
  },
};

// Create and start the Apollo Server
const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
