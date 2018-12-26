const queries = require("../database/permissions");

const resolvers = {
  Query: {
    permissions: (root, args, { mPool }) => {
      return queries(mPool).getAll();
    },
    permission: (root, args, { loaders }) => {
      return loaders.permissionsByIds.load(args.id);
    }
  }
};

module.exports.resolvers = resolvers;
