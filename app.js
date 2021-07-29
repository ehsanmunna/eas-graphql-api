const express = require('express');
const eg = require('express-graphql');
// const schema = require('./schema');
const schema = require('./schema-sequilize');

const app = express();

app.use('/graphql', eg.graphqlHTTP({
    schema: schema,
    graphiql: true
}));

app.listen(4000, () => {
    console.log('now listening for request on port: 4000');
})