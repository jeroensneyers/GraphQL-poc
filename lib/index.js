const { nodeEnv } = require("./util");
console.log(`Running in ${nodeEnv} mode...`);

const DataLoader = require("dataloader");
const app = require("express")();

const ncSchema = require("../schema");
const graphqlHTTP = require("express-graphql");

const { MongoClient } = require("mongodb");
const assert = require("assert");
const mConfig = require("../config/mongo")[nodeEnv];

MongoClient.connect(
  mConfig.url,
  (err, mPool) => {
    assert.equal(err, null);
    const usersQueries = require("../database/users")(mPool);
    const permissionGroupQueries = require("../database/permissionGroups")(mPool);
    const permissionQueries = require("../database/permissions")(mPool);

    app.use("/graphql", (req, res) => {
      const loaders = {
        usersByIds: new DataLoader(usersQueries.getByIds),
        permissionGroupsByIds: new DataLoader(permissionGroupQueries.getByIds),
        permissionQueries: new DataLoader(permissionQueries.getByIds)
      };
      graphqlHTTP({
        schema: ncSchema,
        graphiql: true,
        context: { mPool, loaders }
      })(req, res);
    });

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}`);
    });
  }
);
