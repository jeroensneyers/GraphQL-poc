const userQueries = require("../database/users");
const { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLNonNull, GraphQLList } = require("graphql");
const UserType = require("./types/user");

const RootQueryType = new GraphQLObjectType({
  name: "RootQuery",

  fields: () => ({
    users: {
      type: new GraphQLList(UserType),
      resolve: (obj, args, { mPool }) => userQueries(mPool).getAll()
    },
    user: {
      type: UserType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve: (obj, args, { loaders }) => loaders.usersByIds.load(args.id)
    }
  })
});

const ncSchema = new GraphQLSchema({
  query: RootQueryType
});

module.exports = ncSchema;
