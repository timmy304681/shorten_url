require('dotenv').config()
const redis = require('redis')
const {CACHE_HOST, CACHE_PORT, CACHE_USER, CACHE_PASSWORD} = process.env
const redisClient = redis.createClient({url: `redis://${CACHE_USER}:${CACHE_PASSWORD}@${CACHE_HOST}:${CACHE_PORT}`})
// redisClient.ready = false

redisClient.connect()

redisClient.on('connect', ()=> {
  redisClient.ready = true
  console.log('Connected to redis.')
})

redisClient.on('error', (err) => {
  console.error(err);
  console.log('Connection failed.')
})

redisClient.on('end', () => {
  redisClient.ready = false;
  console.log('Redis is disconnected');
});

module.exports = redisClient