// require('dotenv').config({ path: '../.env' });
// const pool = require('./mysqlcon');
const poolWrite = require('./mysqlconf').dbWrite;
const poolRead1 = require('./mysqlconf').dbRead1;
const poolRead2 = require('./mysqlconf').dbRead2;
const poolRead3 = require('./mysqlconf').dbRead3;
const rand = require('random-key');

const addShortUrl = async (longUrl) => {
  const getRandom = rand.generate(6);
  // 組成七碼隨機 url
  const shortUrl = process.env.EC2_NUM + getRandom;
  const conn = await poolWrite.getConnection();
  try {
    await conn.query('START TRANSACTION');
    let [resCheckShortUrl] = await conn.query(
      'SELECT * FROM url_info WHERE short_url = ? FOR UPDATE',
      [shortUrl]
    );
    while (resCheckShortUrl.length !== 0) {
      // 有重複的 shortUrl
      const getRandom = rand.generate(6);
      // 組成七碼隨機 url
      const shortUrl = process.env.EC2_NUM + getRandom;
      [resCheckShortUrl] = await conn.query(
        'SELECT * FROM url_info WHERE short_url = ? FOR UPDATE',
        [shortUrl]
      );
    }
    await conn.query(
      'INSERT INTO `url_info` (short_url, long_url) VALUES (?,?)',
      [shortUrl, longUrl]
    );
    await conn.query('COMMIT');
    return shortUrl;
  } catch (error) {
    await conn.query('ROLLBACK');
    return { error };
  } finally {
    conn.release();
  }
};

const getLongUrl1 = async (shortUrl) => {
  const [result] = await poolRead1.query(
    `SELECT * FROM url_info WHERE short_url = ?`,
    [shortUrl]
  );
  return result[0].long_url;
};

const getLongUrl2 = async (shortUrl) => {
  const [result] = await poolRead2.query(
    `SELECT * FROM url_info WHERE short_url = ?`,
    [shortUrl]
  );
  return result[0].long_url;
};

const getLongUrl3 = async (shortUrl) => {
  const [result] = await poolRead3.query(
    `SELECT * FROM url_info WHERE short_url = ?`,
    [shortUrl]
  );
  return result[0].long_url;
};

module.exports = { addShortUrl, getLongUrl1, getLongUrl2, getLongUrl3 };
