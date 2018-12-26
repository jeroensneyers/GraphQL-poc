// GENERATED

const DataLoader = require("dataloader");

module.exports = mPool => {
  const userQueries = require("./database/users")(mPool);
  const permissionGroupQueries = require("./database/permissionGroups")(mPool);
  const permissionQueries = require("./database/permissions")(mPool);

  const loaders = {
    usersByIds: new DataLoader(userQueries.getByIds),
    permissionGroupsByIds: new DataLoader(permissionGroupQueries.getByIds),
    permissionsByIds: new DataLoader(permissionQueries.getByIds)
  };

  return loaders;
};
