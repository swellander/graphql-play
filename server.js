const express = require('express');
const expressGraphQL = require('express-graphql');

const app = express();
const schema = require('./schema/schema');

app.use('/graphql', expressGraphQL({
    graphiql: true,
    schema,
}))

app.listen(2000, () => console.log('listening on port 2000'))
