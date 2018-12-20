const { GraphQLObjectType, GraphQLString, GraphQLID } = require("graphql");
const AuditDataType = require("./auditData");

module.exports = new GraphQLObjectType({
  name: "PermissionGroup",

  fields: () => {
    return {
      id: { type: GraphQLID },
      name: { type: GraphQLString },
      created: { type: AuditDataType },
      modified: { type: AuditDataType },
      deleted: { type: AuditDataType }
    };
  }
});
