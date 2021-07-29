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
const graphlSequelize = require('graphql-sequelize');
const ApplicationTypeModel = require('./models/ApplicationType')(sequelizeDb, Sequelize);
const ApplicationStatusModel = require('./models/ApplicationStatus')(sequelizeDb, Sequelize);
const ApplicationModel = require('./models/Application')(sequelizeDb, Sequelize);

/**
 * association
 */
 ApplicationModel.belongsTo(ApplicationStatusModel);
 ApplicationModel.belongsTo(ApplicationTypeModel);


const createdUpdatedFields = {
    createdBy: { type: GraphQLString },
    createdOn: { type: GraphQLString },
    updatedBy: { type: GraphQLString },
    updatedOn: { type: GraphQLString }
}
const typeApplicationType = new GraphQLObjectType({
    name: 'ApplicationType',
    fields: () => ({
        id: { type: GraphQLString },
        statusName: { type: GraphQLString },
        active: { type: GraphQLBoolean },
        applicationFormat: { type: GraphQLString },
        applicationInstruction: { type: GraphQLString },
        applicationTypeName: { type: GraphQLString },
        canShowRemarks: { type: GraphQLBoolean },
        ...createdUpdatedFields
    })
})

const typeApplicationStatus = new GraphQLObjectType({
    name: 'ApplicationStatus',
    fields: () => ({
        id: { type: GraphQLString },
        statusName: { type: GraphQLString }
    })
})

const Application = new GraphQLObjectType({
    name: 'Application',
    fields: () => ({
        id: { type: GraphQLString },
        employeeId: { type: GraphQLString },
        applicationTypeId: { type: GraphQLString },
        applicationType: { type: typeApplicationType },
        applicationBody: { type: GraphQLString },
        applicationStatusId: { type: GraphQLString },
        applicationStatus: { type: typeApplicationStatus },
        semesterId: { type: GraphQLString },
        ...createdUpdatedFields,
        letterDone: { type: GraphQLString }
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
            resolve: graphlSequelize.resolver(ApplicationTypeModel)
        },
        applicationTypes: {
            type: new GraphQLList(typeApplicationType),
            resolve: graphlSequelize.resolver(ApplicationTypeModel)
        },
        applicationStatus: {
            type: typeApplicationStatus,
            args: {
                id: { type: GraphQLString }
            },
            resolve: graphlSequelize.resolver(ApplicationStatusModel)
        },
        applicationStatusList: {
            type: new GraphQLList(typeApplicationStatus),
            resolve: graphlSequelize.resolver(ApplicationStatusModel)
        },
        application: {
            type: Application,
            args: {
                id: { type: GraphQLString }
            },
            resolve: graphlSequelize.resolver(ApplicationModel, {
                before: (findOptions, args, context) => {
                    findOptions.include = [ApplicationStatusModel, ApplicationTypeModel]
                    return findOptions;
                  }
            })
        },
        applications: {
            type: new GraphQLList(Application),
            args: {
                id: { type: GraphQLString },
                employeeId: { type: GraphQLString },
                applicationTypeId: { type: GraphQLString },
                applicationBody: { type: GraphQLString },
                applicationStatusId: { type: GraphQLString },
                semesterId: { type: GraphQLString },
                ...createdUpdatedFields,
                letterDone: { type: GraphQLString }
            },
            resolve: graphlSequelize.resolver(ApplicationModel, {
                before: (findOptions, args, context) => {
                    findOptions.where = args
                    findOptions.include = [ApplicationStatusModel, ApplicationTypeModel]
                    return findOptions;
                  }
            })
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