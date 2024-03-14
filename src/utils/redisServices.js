import { Redis } from "ioredis";

// Creating a Redis client from host and port
const redisClient = new Redis({
    port: process.env.REDIS_PORT,
    host: process.env.REDIS_HOST,
    password: 'sanjeev1412_shopEasy' 
});

// Error handling
redisClient.on('error', (err) => {
    console.error('Redis client error:', err);
});

export default redisClient;

