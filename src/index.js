import 'dotenv/config';
import express from 'express';
import { ApolloServer, gql } from 'apollo-server-express';
import cors from 'cors'

const app = express();
app.use(cors());

const schema = gql`
  type Query {
    me: User
  }

  type User {
    username: String
    age: Int
  }
`;
const resolvers = {
  Query: {
    me: () => {
      return {
        username: 'Brian Hawi',
        age: 25
      };
    },
  },
};

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
});

server.applyMiddleware({ app, path: '/graphql' });

app.listen({port: 8000}, () =>  {
  console.log("We live and ready at http://localhost:8000/graphql")
})
