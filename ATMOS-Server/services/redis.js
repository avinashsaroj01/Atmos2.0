require("dotenv").config(); // Ensure environment variables are loaded

const { createClient } = require("redis");


const client = createClient({
  socket: {
    host: "127.0.0.1",
    port: 6379,
    connectTimeout: 10000, // Increase timeout to 10 seconds

  },
  password: process.env.REDIS_PASSWORD, // Ensure the password is set if Redis is secured

});


client.on("error", (err) => {
  console.error("Redis Client Error:", err.message);
  if (err.code === "ECONNREFUSED") {
    console.error("Connection refused. Is Redis running?");
  }
});

const clientConnect = async () => {
  try {
    if (!client.isOpen) {
      console.log("Connecting to Redis...");
      await client.connect();
      console.log("Redis connected successfully!");
    }
  } catch (err) {
    console.error("Failed to connect to Redis:", err.message);
  }
};

clientConnect();

module.exports = client;
