const { gql } = require("apollo-server");

const { DateTime } = require("./scalar");
const GraphQLJSON = require("graphql-type-json");
const { LocalizedDirective } = require("./localized.decorator");

const { typedefs: userManagementTypeDefs } = require("./usermanagement/typedefs");
const { resolvers: userResolvers } = require("./usermanagement/resolvers/users.resolvers");
const { resolvers: permissionGroupResolvers } = require("./usermanagement/resolvers/permission-groups.resolvers");
const { resolvers: permissionResolvers } = require("./usermanagement/resolvers/permissions.resolvers");

const Query = gql`
  scalar DateTime
  scalar JSON

  directive @localized(propertyToLocalize: String) on FIELD_DEFINITION

  type Query {
    users(name: String!): [User]
    user(id: String!): User

    permissionGroups: [PermissionGroup]
    permissionGroup(id: String!): PermissionGroup

    permissions: [Permission]
    permission(id: String!): Permission
  }
`;

const rootResolvers = {
  DateTime,
  JSON: GraphQLJSON
};

module.exports = {
  typeDefs: [Query, userManagementTypeDefs],
  resolvers: [rootResolvers, userResolvers, permissionGroupResolvers, permissionResolvers],
  schemaDirectives: {
    localized: LocalizedDirective
  }
};
