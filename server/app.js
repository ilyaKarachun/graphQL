import express from 'express';
import { graphqlHTTP } from "express-graphql";
import { newSchema } from '../schema/schema.js';
import cors from 'cors';
import { MongoClient, ServerApiVersion } from 'mongodb';

const app = express();
const PORT = 3005;

const uri = "mongodb+srv://ikarachun:solvd2023@cluster0.b9xan1t.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

app.use(cors());
app.use('/graphql', graphqlHTTP({
  schema: newSchema,
  graphiql: true
}));
app.use('/', (req, res) => {
  res.send('Hi');
  res.end();
});

async function startServer() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");

    app.listen(PORT, err => {
      if (err) {
        console.log(err);
      } else {
        console.log(`Server started on port ${PORT}`);
      }
    });
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
  }
}

startServer();
