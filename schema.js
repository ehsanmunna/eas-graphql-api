const graphql = require('graphql');
const {
    GraphQLObjectType,
    GraphQLInputObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLInt, GraphQLBoolean,
    GraphQLSchema
} = graphql;
const graphlSequelize = require('graphql-sequelize');
const ApplicationModel = require('./models/Application');
const exclude = (obj, keys) => {
    var target = {};
    for (var i in obj) {
      if (keys.indexOf(i) >= 0) continue;
      if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
      target[i] = obj[i];
    }
    return target;
  }
const servicePath = '../eas-service/src/'
const applicationService = require('../eas-service/src/service/Application');
const applicationTypeService = require(servicePath +'service/ApplicationTypeService');
const applicationStatusService = require(servicePath +'service/ApplicationStatus');
const idFields = { id: { type: GraphQLString } };
const createdUpdatedFields = {
    createdBy: { type: GraphQLString },
    createdOn: { type: GraphQLString },
    updatedBy: { type: GraphQLString },
    updatedOn: { type: GraphQLString },
}
const paginationInputFields = {
    pageNumber: { type: GraphQLInt },
    pageSize: { type: GraphQLInt },
}

const typeApplicationType = new GraphQLObjectType({
    name: 'ApplicationType',
    fields: () => ({
        ...idFields,
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
        ...idFields,
        statusName: { type: GraphQLString }
    })
})

const applicationFields = {
    ...idFields,
    employeeId: { type: GraphQLString },
    applicationTypeId: { type: GraphQLString },
    applicationBody: { type: GraphQLString },
    applicationStatusId: { type: GraphQLString },
    semesterId: { type: GraphQLString },
    ...createdUpdatedFields,
    letterDone: { type: GraphQLString }
}
// const paginationOutputFields = {
//     data: { type: new GraphQLList(applicationFields)},
//     count: { type: GraphQLInt }
// }
const typeApplication = new GraphQLObjectType({
    name: 'Application',
    fields: () => (applicationFields)
})

// const typeApplicationPagination = new GraphQLObjectType({
//     name: 'Application_Pagination',
//     fields: () => (
//         {
//             ...applicationFields,
//             ...paginationOutputFields
//         }
//     )
// })
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        applicationType: {
            type: typeApplicationType,
            args: {
                id: { type: GraphQLString }
            },
            async resolve(parent, args) {
                return await applicationTypeService.getById(args.id);
            }
        },
        applicationTypes: {
            type: new GraphQLList(typeApplicationType),
            async resolve(parent, args) {
                return await applicationTypeService.getList();
            }
        },
        applicationStatus: {
            type: typeApplicationStatus,
            args: {
                id: { type: GraphQLString }
            },
            async resolve(parent, args) {
                return await applicationStatusService.getById(args.id);
            }
        },
        applicationStatusList: {
            type: new GraphQLList(typeApplicationStatus),
            async resolve(parent, args) {
                return await applicationStatusService.getList()
            }
        },
        application: {
            type: new GraphQLInputObjectType(applicationFields),
            // type: new GraphQLInputObjectType({
            //     name: 'Application',
            //     fields: () => (applicationFields)
            // }),
            args: {
                id: { type: GraphQLString }
            },
            resolve: graphlSequelize.resolver(ApplicationModel)
            // async resolve(parent, args) {
            //     // return await applicationService.getById(args.id);
            //     return await ApplicationModel.findByPk(args.id);
            // }
        },
        applications: {
            type: new GraphQLObjectType(applicationFields),
            // type: new GraphQLObjectType({
            //     name: 'ApplicationP',
            //     fields: () => ({
            //         data: {type: new GraphQLList(typeApplication)},
            //         count: {type: GraphQLInt}
            //     })
            // }),
            args: {
                id: { type: GraphQLString },
                employeeId: { type: GraphQLString },
                applicationTypeId: { type: GraphQLString },
                applicationStatusId: { type: GraphQLString },
                ...paginationInputFields
            },
            async resolve(parent, args) {
                // return await ApplicationModel.findAll();
                const _query = exclude(args, ['pageNumber', 'pageSize'])
                const res = await applicationService.getListPagging(args.pageNumber, args.pageSize, _query);
                return res;
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addApplication: {
            type: typeApplication,
            args: {
                employeeId: { type: GraphQLString },
                applicationTypeId: { type: GraphQLString },
                applicationBody: { type: GraphQLString },
                applicationStatusId: { type: GraphQLString },
                semesterId: { type: GraphQLString },
                letterDone: { type: GraphQLString }
            },
            async resolve(parent, args) {
                return await applicationService.save(args);
            }
        },
        updateApplication: {
            type: typeApplication,
            args: {
                id: { type: GraphQLString },
                employeeId: { type: GraphQLString },
                applicationTypeId: { type: GraphQLString },
                applicationBody: { type: GraphQLString },
                applicationStatusId: { type: GraphQLString },
                semesterId: { type: GraphQLString },
                letterDone: { type: GraphQLString }
            },
            async resolve(parent, args) {
                return await applicationService.update(args);
            }
        },
        deleteApplication: {
            type: typeApplication,
            args: {
                id: { type: GraphQLString },
            },
            async resolve(parent, args) {
                return await applicationService.delete(args.id);
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})