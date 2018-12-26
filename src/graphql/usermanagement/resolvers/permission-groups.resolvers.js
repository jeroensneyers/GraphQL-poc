const queries = require("../database/permissionGroups");

const resolvers = {
  Query: {
    permissionGroups: (root, args, { mPool }) => {
      return queries(mPool).getAll();
    },
    permissionGroup: (root, args, { loaders }) => {
      return loaders.permissionGroupsByIds.load(args.id);
    }
  },
  PermissionGroup: {
    permissions(root, args, { loaders }) {
      let promises = root.permissions.map(i => loaders.permissionsByIds.load(i));
      return Promise.all(promises);
    },
    localizedName(root, args, { loaders }) {
      return root.name[args.language];
    }
  }
};

module.exports.resolvers = resolvers;
