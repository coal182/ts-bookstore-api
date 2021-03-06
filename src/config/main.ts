export default {
  API_PORT: process.env.PORT || 3000,
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://user:123456@mongodb:27017/bookstore',
  DB_NAME: process.env.DB_NAME || 'bookstore',
  REDIS_URI: process.env.REDIS_URI || 'redis://redis-16955.c278.us-east-1-4.ec2.cloud.redislabs.com:16955',
  REDIS_HOST: process.env.REDIS_HOST || 'redis-16955.c278.us-east-1-4.ec2.cloud.redislabs.com',
  REDIS_PORT: process.env.REDIS_PORT || 16955,
  REDIS_PASSWORD: process.env.REDIS_PASSWORD || 'password',
  JWT_SECRET: process.env.JWT_SECRET || '123456',
};
