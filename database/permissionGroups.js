const { orderedFor, replaceMongoObjectIdWithString } = require("../lib/util");
var ObjectId = require("mongodb").ObjectID;

module.exports = mPool => {
  let collectionName = "permissionGroups";
  return {
    getAll() {
      return mPool
        .collection(collectionName)
        .find({})
        .toArray()
        .then(rows => {
          let x = replaceMongoObjectIdWithString(rows);
          return x;
        });
    },
    getByIds(ids) {
      return mPool
        .collection(collectionName)
        .find({ _id: { $in: ids } })
        .toArray()
        .then(rows => {
          return orderedFor(rows, ids, "id", true);
        });
    }
  };
};
