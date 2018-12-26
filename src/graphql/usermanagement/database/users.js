const { orderedFor, replaceMongoObjectIdWithString } = require("../../../util");
var ObjectId = require("mongodb").ObjectID;

module.exports = mPool => {
  let collectionName = "users";
  return {
    getAll(args) {
      return mPool
        .db("usermanagement")
        .collection(collectionName)
        .find({ "name.last": args.name })
        .toArray()
        .then(rows => replaceMongoObjectIdWithString(rows));
    },
    getByIds(ids) {
      return mPool
        .db("usermanagement")
        .collection(collectionName)
        .find({ _id: { $in: ids.map(i => ObjectId(i)) } })
        .toArray()
        .then(rows => orderedFor(rows, ids, "id", true));
    }
  };
};
