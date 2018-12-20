const { GraphQLObjectType, GraphQLString } = require("graphql");

module.exports = new GraphQLObjectType({
  name: "LocalizedString",

  fields: () => {
    return {
      nl: { type: GraphQLString },
      fr: { type: GraphQLString },
      en: { type: GraphQLString }
    };
  }
});
