const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLList, GraphQLNonNull } = require("graphql");
const NameType = require("./name");
const AuditDataType = require("./auditData");
const PermissionGroupType = require("./permissionGroup");
const permissionGroupQueries = require("../../database/permissionGroups");

module.exports = new GraphQLObjectType({
  name: "User",

  fields: () => {
    return {
      id: { type: GraphQLID },
      name: { type: NameType },
      fullName: {
        type: GraphQLString,
        resolve: obj => `${obj.name.first} ${obj.name.last}`
      },
      language: { type: GraphQLString },
      country: { type: GraphQLString },
      email: { type: new GraphQLNonNull(GraphQLString) },
      phone: { type: GraphQLString },
      companyName: { type: GraphQLString },
      created: { type: AuditDataType },
      modified: { type: AuditDataType },
      deleted: { type: new GraphQLNonNull(AuditDataType) },
      expandedPermissionGroups: {
        type: new GraphQLList(PermissionGroupType),
        resolve: (obj, args, { mPool }) => permissionGroupQueries(mPool).getByIds(obj.permissionGroups)
      }
    };
  }
});
