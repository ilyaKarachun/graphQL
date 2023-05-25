const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('../schema/schema');
const cors = require('cors')

const app = express();
const PORT = 3005;

app.use(cors())
app.use('/graphql', graphqlHTTP.graphqlHTTP({
  schema, graphiql: true
}))
app.use('/', (req, res) => {
  res.send('Hi')
  res.end()
})

app.listen(PORT, err => {
  err ? console.log(err) : console.log(`Server started on port ${PORT}`)
})
