require('dotenv').config()
const {dbWrite, dbRead1, dbRead2, dbRead3} = require('../models/mysqlconf')
// redis 的來源無{}故毋須用解構寫法
const redisClient = require('../util/cache')

// TODO: long_url 改為GET from api
const long_url = 'https://flaviocopes.com/how-to-use-redis-nodejs/'

// TODO: 改為宣揚設定的redis key，判斷從哪個set取key?
const getKGSKey = async () => {
  try{
    const KGSKey = await redisClient.sPop('key')
    console.log('get key from cache.');
    await dbWrite.execute('INSERT INTO `url_info` (short_url, long_url) VALUES (?, ?)', [KGSKey, long_url])
    console.log('Data insert into DB.');
  } catch(err){
    console.error(err)
  }
}


const insertData = async () => {
  try{
    await dbWrite.execute('INSERT INTO `url_info` (short_url, long_url) VALUES (?, ?)', [KGSKey, long_url])
    console.log('Data insert into DB.');
  } catch(err){
    console.error(err)
  }
}

const readData1 = async () => {
  const [result] = await dbRead1.execute('SELECT * FROM `url_info` WHERE id = ?', [])
}

getKGSKey()
insertData()

module.exports = {dbWrite, dbRead1, dbRead2, dbRead3}