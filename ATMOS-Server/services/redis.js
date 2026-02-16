require("dotenv").config();
const { createClient } = require("redis");

let client;

// If REDIS_URL exists → production (Render)
if (process.env.REDIS_URL) {
  console.log("Using Render Redis");

  client = createClient({
    url: process.env.REDIS_URL,
    socket: {
      connectTimeout: 10000,
    },
  });
} else {
  // Local Docker Redis
  console.log("Using Local Redis");

  client = createClient({
    socket: {
      host: "127.0.0.1",
      port: 6379,
      connectTimeout: 10000,
    },
    password: process.env.REDIS_PASSWORD || undefined,
  });
}

client.on("error", (err) => {
  console.error("Redis Error:", err.message);
});

client.on("connect", () => {
  console.log("Redis Connected");
});

async function connectRedis() {
  try {
    if (!client.isOpen) {
      await client.connect();
    }
  } catch (err) {
    console.error("Redis Connection Failed:", err.message);
  }
}

connectRedis();

module.exports = client;
