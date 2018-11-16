const graphql = require('graphql');
const axios = require('axios');
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
} = graphql;



//Types are similar to sequelize models
//Convention is to capitalize name
const CompanyType = new GraphQLObjectType({
    name: 'Company',
    fields: {
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        description: { type: GraphQLString }
    }
});

//NOTE: see ./when_resolver_is_needed.png for diagram

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: {
        id: {
            type: GraphQLString,
        },
        firstName: {
            type: GraphQLString,
        },
        age: {
            type: GraphQLInt,
        },
        company: {
            type: CompanyType,
            resolver(parentValue, args) {
                console.log(parentValue)
                return axios.get(`http://localhost:3000/companies/${parentValue.companyId}`)
                    .then(response => response.data)
                    .catch(err => console.log(err))
            }
        }
    },
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        user: {
            type: UserType,
            args: { id: { type: GraphQLString } },
            resolve(parentValue, args) {
                //graphql will wait for promise to be resolved before sending it to client
                return axios.get(`http://localhost:3000/users/${args.id}`)
                    .then(response => response.data)
                    .catch(err => console.log(err))
            }
        },
    },
});

module.exports = new GraphQLSchema({
    query: RootQuery,
});
