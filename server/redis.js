const redis = require("redis"),
      client = redis.createClient();

client.select(0);

client.on("error", function (err) {
    console.log("Error " + err);
});

module.exports = {
  client: client
};
