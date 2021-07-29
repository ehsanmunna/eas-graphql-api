const graphql = require('graphql');
const Sequelize = require('sequelize');
const sequelizeDb = require('./dbConnection');
const {
    GraphQLObjectType,
    GraphQLInputObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLInt, GraphQLBoolean,
    GraphQLSchema
} = graphql;
// const graphlSequelize = require('graphql-sequelize');
const ApplicationTypeModel = require('./models/ApplicationType')(sequelizeDb, Sequelize);
const typeApplicationType = new GraphQLObjectType({
    name: 'ApplicationType',
    fields: () => ({
        id: { type: GraphQLString },
        statusName: { type: GraphQLString },
        active: { type: GraphQLBoolean },
        applicationFormat: { type: GraphQLString },
        applicationInstruction: { type: GraphQLString },
        applicationTypeName: { type: GraphQLString },
        canShowRemarks: { type: GraphQLBoolean }
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        applicationType: {
            type: typeApplicationType,
            args: {
                id: { type: GraphQLString }
            },
            async resolve(parent, args) {
                return await ApplicationTypeModel.findByPk(args.id);
            }
        },
        applicationTypes: {
            type: new GraphQLList(typeApplicationType),
            // args: {
            //     id: { type: GraphQLString }
            // },
            async resolve(parent, args) {
                return await ApplicationTypeModel.findAll();
            }
        }
        
    }
});

// const Mutation = new GraphQLObjectType({
//     name: 'Mutation',
//     fields: {
//         addApplication: {
//             type: typeApplication,
//             args: {
//                 employeeId: { type: GraphQLString },
//                 applicationTypeId: { type: GraphQLString },
//                 applicationBody: { type: GraphQLString },
//                 applicationStatusId: { type: GraphQLString },
//                 semesterId: { type: GraphQLString },
//                 letterDone: { type: GraphQLString }
//             },
//             async resolve(parent, args) {
//                 return await applicationService.save(args);
//             }
//         },
//         updateApplication: {
//             type: typeApplication,
//             args: {
//                 id: { type: GraphQLString },
//                 employeeId: { type: GraphQLString },
//                 applicationTypeId: { type: GraphQLString },
//                 applicationBody: { type: GraphQLString },
//                 applicationStatusId: { type: GraphQLString },
//                 semesterId: { type: GraphQLString },
//                 letterDone: { type: GraphQLString }
//             },
//             async resolve(parent, args) {
//                 return await applicationService.update(args);
//             }
//         },
//         deleteApplication: {
//             type: typeApplication,
//             args: {
//                 id: { type: GraphQLString },
//             },
//             async resolve(parent, args) {
//                 return await applicationService.delete(args.id);
//             }
//         }
//     }
// })

module.exports = new GraphQLSchema({
    query: RootQuery,
    // mutation: Mutation
})