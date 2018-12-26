const express = require("express");
const { nodeEnv } = require("./util");
const path = require("path");
const bodyParser = require("body-parser");
const asyncify = require("express-asyncify");
const { ApolloServer } = require("apollo-server-express");
const schema = require("./graphql/schema");
const graphqlTools = require("graphql-tools");
const { MongoClient } = require("mongodb");
const assert = require("assert");
const mConfig = require("../config/mongo")[nodeEnv];

// app setup
const app = asyncify(express());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

// fallback not found
app.all("/api/*", async (req, res) =>
  res.status(404).json({
    code: "NotFound",
    message: "Resource not found or method not supprted"
  })
);

MongoClient.connect(
  mConfig.url,
  { useNewUrlParser: true },
  (err, mPool) => {
    assert.equal(err, null);

    const loaders = require("./graphql/loaders")(mPool);

    const graphQlServer = new ApolloServer({
      typeDefs: schema.typeDefs,
      resolvers: schema.resolvers,
      schemaDirectives: schema.schemaDirectives,
      context: ({ req }) => {
        //TODO: remove this line, this must be set on the client
        req.headers["Accept-Language"] = "nl";
        return { mPool, loaders, req };
      }
    });

    graphQlServer.applyMiddleware({ app });

    const port = process.env.PORT || 3000;
    const server = app.listen(port, () => {
      console.log(`Express server listening on port: http://localhost:${server.address().port}`);
    });
  }
);
