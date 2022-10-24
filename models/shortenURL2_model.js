require('dotenv').config()
const { dbWrite, dbRead1, dbRead2, dbRead3 } = require('./mysqlconf.js')

const { encodeBase62 } = require('../util/encodeBase62')

async function getShortURL (longURL) {
  // insert into database and get id
  const [result] = await dbWrite.execute(
    'INSERT INTO url_info (short_url, long_url) VALUES (NULL, ?)',
    [longURL]
  )
  const id = result.insertId

  // encode id into base62
  const encodedId = encodeBase62(Number(id))

  // add prefix 'A's to encoded string as shortURL
  const shortURL =
    process.env.EC2_NUM + 'A'.repeat(6 - encodedId.length) + encodedId

  // insert shortURL
  await dbWrite.execute('UPDATE url_info SET short_url = ? WHERE id = ?', [
    shortURL,
    id
  ])
  return shortURL
}

async function getLongURLFromDb1 (id ) {
  const [[result]] = await dbRead1.execute(
    'SELECT long_url FROM url_info WHERE id = ?',
    [id]
  )
  return result
}

async function getLongURLFromDb2 (id ) {
  const [[result]] = await dbRead1.execute(
    'SELECT long_url FROM url_info WHERE id = ?',
    [id]
  )
  return result
}

async function getLongURLFromDb3 (id ) {
  const [[result]] = await dbRead1.execute(
    'SELECT long_url FROM url_info WHERE id = ?',
    [id]
  )
  return result
}

module.exports = { getShortURL, getLongURLFromDb1, getLongURLFromDb2, getLongURLFromDb3 }
