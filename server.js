const express = require('express');
const expressGraphQL = require('express-graphql');

const app = express();

app.use('/graphql', expressGraphQL({
    graphiql: true
}))

app.listen(2000, () => console.log('listening on port 2000'))
