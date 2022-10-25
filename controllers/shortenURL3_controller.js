const { EC2_ENDPOINT } = process.env;
require('dotenv').config();
const {
  getShortUrl,
  getLongUrl1,
  getLongUrl2,
  getLongUrl3,
} = require('../models/shortenURL3_model');
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
    case 'C':
      longURL = await getLongUrl2(shortURL);
    case 'D':
      longURL = await getLongUrl3(shortURL);
  }

  res.redirect(301, longURL['long_url']);
};

const postURL = async (req, res) => {
  const longURL = req.body.longURL;
  if (checkURLFormat(longURL) != true) {
    res.status(403).json({ error: 'Please check the input' });
  }

  const shortURLBase62 = await getShortUrl(longURL);
  const shortURL = `http://${EC2_ENDPOINT}/api/v3/${shortURLBase62}`;
  res.status(200).json({ shortURL });
};

module.exports = { getURL, postURL };
