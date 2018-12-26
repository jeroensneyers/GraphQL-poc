const { orderedFor, replaceMongoObjectIdWithString } = require("../../../util");
var ObjectId = require("mongodb").ObjectID;

module.exports = mPool => {
  let collectionName = "permissions";
  return {
    getAll() {
      return mPool
        .db("usermanagement")
        .collection(collectionName)
        .find({})
        .toArray()
        .then(rows => replaceMongoObjectIdWithString(rows));
    },
    getByIds(ids) {
      console.log("Call permissions.getByIds");
      return mPool
        .db("usermanagement")
        .collection(collectionName)
        .find({ _id: { $in: ids } })
        .toArray()
        .then(rows => orderedFor(rows, ids, "id", true));
    }
  };
};
