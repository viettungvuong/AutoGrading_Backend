const { MongoClient, ServerApiVersion } = require("mongodb");
var uri = "";

async function runDatabase() {
  uri = process.env.MONGO_DB_URL;
  console.log(uri);
  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("You successfully connected to MongoDB!");
  } finally {
    await client.close();
  }
}

module.exports = {
  runDatabase,
};
