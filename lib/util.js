const humps = require("humps");
const _ = require("lodash");

module.exports = {
  nodeEnv: process.env.NODE_ENV || "development",
  orderedFor: (rows, collection, field, isSingleObject) => {
    // data loaders expect the same amount of output as input, as well as ordered output
    // If we want to make sure all properties are camelCased, we might run "humps.camelizeKeys(data);", but do this after we replaced the mongoId, since that uses _id.
    const data = module.exports.replaceMongoObjectIdWithString(rows);
    const inGroupsOfField = _.groupBy(data, field);

    return collection.map(el => {
      const elementArray = inGroupsOfField[el];
      return elementArray ? (isSingleObject ? elementArray[0] : elementArray) : isSingleObject ? {} : [];
    });
  },
  replaceMongoObjectIdWithString: array => {
    var hasMongoObjectId = array && array.length && array[0].hasOwnProperty("_id");
    if (hasMongoObjectId) {
      array.forEach(i => (i["id"] = i._id.toString()));
    }
    return array;
  },
  slug: str => {
    return str.toLowerCase().replace(/[\s\W-]+/, "-");
  }
};
