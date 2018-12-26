const queries = require("../database/users");

const resolvers = {
  Query: {
    users: (root, args, { mPool }) => {
      return queries(mPool).getAll(args);
    },
    user: (root, args, { loaders }) => {
      return loaders.usersByIds.load(args.id);
    }
  },
  User: {
    permissionGroups(root, args, { loaders }) {
      return root.permissionGroups.map(i => loaders.permissionGroupsByIds.load(i));
    }
  }
};

module.exports.resolvers = resolvers;
