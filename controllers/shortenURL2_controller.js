require('dotenv').config();
const {
  getShortURL,
  getLongURLFromDb1,
  getLongURLFromDb2,
  getLongURLFromDb3,
} = require('../models/shortenURL2_model');
const { decodeBase62 } = require('../util/decodeBase62');
const { checkURLFormat } = require('../util/util');
const { EC2_ENDPOINT } = process.env;

const getShortenURL = async (req, res) => {
  const targetURL = req.params.targetURL;
  const shortURLFirst = targetURL.split('')[0];
  const shortURLEncode = targetURL.substring(1);
  let longURL;
  let longURLId;
  switch (shortURLFirst) {
    case 'B':
      longURLId = await decodeBase62(shortURLEncode);
      longURL = await getLongURLFromDb1(longURLId);
    case 'C':
      longURLId = await decodeBase62(shortURLEncode);
      longURL = await getLongURLFromDb2(longURLId);
    case 'D':
      longURLId = await decodeBase62(shortURLEncode);
      longURL = await getLongURLFromDb3(longURLId);
  }

  res.redirect(301, longURL['long_url']);
};

const postShortenURL = async (req, res) => {
  const longURL = req.body.longURL;

  if (checkURLFormat(longURL) != true) {
    res.status(403).json({ error: 'Please check the input' });
  }

  const shortURL = await getShortURL(longURL);
  res.status(200).json({
    shortURL: `http://${EC2_ENDPOINT}/api/v2/${shortURL}`,
  });
};

module.exports = {
  getShortenURL,
  postShortenURL,
};
