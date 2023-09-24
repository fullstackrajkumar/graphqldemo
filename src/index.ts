import express from 'express';
import bodyParser from 'body-parser';
import { graphqlHTTP } from 'express-graphql';
import robustSchema from './graphql/schemas/schema';
import mongoose from 'mongoose';
import resolver from './graphql/resolvers';
import authMiddleware from './helpers/authMiddleware';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(bodyParser.json());
app.use(authMiddleware);

app.use('/graphql', graphqlHTTP({
  schema: robustSchema,
  rootValue: resolver,
  graphiql: true
}));

mongoose.connect(`mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`).then(() => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}).catch((err: any) => {
  console.log(`Server could not start due to ${err}`)
});