require('dotenv').config()
const {dbWrite} = require('../models/mysqlconf');
const randomKey = require('random-key')

const insertData = async ()=>{
  for(let i = 0; i <= 5000000; i++){
    try{
    const shortUrl = randomKey.generate(7)
    await dbWrite.execute('INSERT INTO `url_info` (id, short_url, long_url) VALUES (?, ?, ?)', [i, shortUrl, `https://www.google.com.tw/${i}`])
  } catch(err){
    console.error(err)
  }
}
console.log('inserting data...');
process.exit()
}

insertData()

// insert fake data in redis
const addKeyValue = async () =>{
  let values = []
  for (let i = 0; i < 20; i++){
    values.push(`value${i}`)
  }
  await redisClient.sAdd('key', values)
  console.log('Data inserted');
}
addKeyValue()