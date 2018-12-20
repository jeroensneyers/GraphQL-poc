const { orderedFor, replaceMongoObjectIdWithString } = require("../lib/util");
var ObjectId = require("mongodb").ObjectID;

module.exports = mPool => {
  let collectionName = "users";
  return {
    getAll() {
      return mPool
        .collection(collectionName)
        .find({})
        .toArray()
        .then(rows => replaceMongoObjectIdWithString(rows));
    },
    getByIds(ids) {
      return mPool
        .collection(collectionName)
        .find({ _id: { $in: ids.map(i => ObjectId(i)) } })
        .toArray()
        .then(rows => orderedFor(rows, ids, "id", true));
    }
  };
};
