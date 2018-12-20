const { GraphQLObjectType, GraphQLString, GraphQLNonNull } = require("graphql");

module.exports = new GraphQLObjectType({
  name: "Name",

  fields: () => {
    return {
      first: { type: new GraphQLNonNull(GraphQLString) },
      last: { type: new GraphQLNonNull(GraphQLString) }
    };
  }
});
