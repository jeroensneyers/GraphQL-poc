// GENERATED

module.exports = mPool => {
  const usermanagementLoaders = require("./usermanagement/loaders")(mPool);
  //const otherLoaders = require("./otherservice/loaders")(mPool);

  const loaders = {};
  Object.assign(loaders, usermanagementLoaders);
  //Object.assign(loaders, otherLoaders);
  return loaders;
};
