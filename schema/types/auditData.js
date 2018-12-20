const { GraphQLObjectType, GraphQLString } = require("graphql");

module.exports = new GraphQLObjectType({
  name: "AuditData",

  fields: () => {
    return {
      at: { type: GraphQLString },
      by: { type: GraphQLString }
    };
  }
});
