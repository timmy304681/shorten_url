require('dotenv').config();
const {
  getShortURL,
  deCodeShortURL,
  readReplicaFromM1,
  readReplicaFromM2,
  readReplicaFromM3,
} = require('../models/shortenURL2_model');
const util = require('../util/util');
const { EC2_ENDPOIN } = process.env;

const getShortenURL = async (req, res) => {
  const targetURL = req.params.targetURL;
  shortURLEncode = targetURL.substring(1);
  let longURL;
  let longURLId;
  switch (shortURLEncode) {
    case 'b':
      longURLId = await deCodeShortURL(shortURLEncode);
      longURL = await readReplicaFromM1(longURLId);
    case 'c':
      longURLId = await deCodeShortURL(shortURLEncode);
      longURL = await readReplicaFromM2(longURLId);
    case 'd':
      longURLId = await deCodeShortURL(shortURLEncode);
      longURL = await readReplicaFromM3(longURLId);
  }
  res.redirect(301, longURL);
};

const postShortenURL = async (req, res) => {
  const longURL = req.body.longURL;
  const shortURL = await getShortURL(longURL);
  res.status(200).json({
    shortURL: `http://${EC2_ENDPOINT}/api/v2/${shortURL}`,
  });
};

module.exports = {
  getShortenURL,
  postShortenURL,
};
