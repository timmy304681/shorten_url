require('dotenv').config()
const {dbWrite, dbRead1, dbRead2, dbRead3} = require('../models/mysqlconf')
const redisClient = require('../util/cache')

const obj = {'B':'1', 'C':'2', 'D':'3'}
const EC2_NUM = process.env.EC2_NUM
const set = 'set'+obj[EC2_NUM]

const getShortUrl = async (longUrl) => {
  try{
    const shortUrl = await redisClient.sPop(set)
    const [result] = await dbWrite.execute('INSERT INTO `url_info` (short_url, long_url) VALUES (?, ?)', [shortUrl, longUrl])
    return result
  } catch(err){
    console.error(err)
  }
}

const getLongUrl1 = async (shortUrl) => {
    const [[result]] = await dbRead1.execute('SELECT long_url FROM `url_info` WHERE short_url = ?', [shortUrl])
    return result 
}

const getLongUrl2 = async (shortUrl) => {
  const [[result]] = await dbRead2.execute('SELECT long_url FROM `url_info` WHERE short_url = ?', [shortUrl])
  return result 
}

const getLongUrl3 = async (shortUrl) => {
  const [[result]] = await dbRead3.execute('SELECT long_url FROM `url_info` WHERE short_url = ?', [shortUrl])
  return result 
}

module.exports = {getShortUrl, getLongUrl1, getLongUrl2, getLongUrl3}