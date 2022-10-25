require('dotenv').config();
const { EC2_ENDPOINT } = process.env;
const {
  addShortUrl,
  getLongUrl1,
  getLongUrl2,
  getLongUrl3,
} = require('../models/shortenURL1_model');
const { checkURLFormat } = require('../util/util');

const getURL = async (req, res) => {
  const shortURL = req.params.shortenURL;
  console.log(shortURL);
  // get first word
  const shortURLFirst = shortURL.split('')[0];
  let longURL;
  switch (shortURLFirst) {
    case 'B':
      longURL = await getLongUrl1(shortURL);
      break;
    case 'C':
      longURL = await getLongUrl2(shortURL);
      break;
    case 'D':
      longURL = await getLongUrl3(shortURL);
      break;
  }

  res.redirect(301, longURL);
};

const postURL = async (req, res) => {
  const longURL = req.body.longURL;

  if (checkURLFormat(longURL) != true) {
    res.status(403).json({ error: 'Please check the input' });
  }

  const shortURLBase62 = await addShortUrl(longURL);
  const shortURL = `http://${EC2_ENDPOINT}/api/v1/${shortURLBase62}`;
  res.status(200).json({ shortURL });
};

module.exports = { getURL, postURL };
