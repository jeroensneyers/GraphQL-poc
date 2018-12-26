const { orderedFor, replaceMongoObjectIdWithString } = require("../../../util");
var ObjectId = require("mongodb").ObjectID;

module.exports = mPool => {
  let collectionName = "permissionGroups";
  return {
    getAll() {
      return mPool
        .db("usermanagement")
        .collection(collectionName)
        .find({})
        .toArray()
        .then(rows => {
          let x = replaceMongoObjectIdWithString(rows);
          return x;
        });
    },
    getByIds(ids) {
      console.log("Call permissionGroups.getByIds");
      return mPool
        .db("usermanagement")
        .collection(collectionName)
        .find({ _id: { $in: ids } })
        .toArray()
        .then(rows => orderedFor(rows, ids, "id", true));
    }
  };
};
