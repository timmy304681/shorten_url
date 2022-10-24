require('dotenv').config();
const { EC2_ENDPOINT } = process.env;
const { addShortUrl, getLongUrl } = require('../models/shortenURL1_model');

const getURL = async (req, res) => {
  const shortURL = req.params.shortURL;

  // get first word
  const shortURLFirst = str.split(shortURL)[0];

  let longURL;
  switch (shortURLFirst) {
    case 'b':
      longURL = await getLongUrl(shortURL);
    case 'c':
      longURL = await getLongUrl(shortURL);
    case 'd':
      longURL = await getLongUrl(shortURL);
  }

  res.redirect(301, longURL);
};

const postURL = async (req, res) => {
  const longURL = req.body.longURL;

  // 預計拿到"a123456"
  const shortURLBase62 = await addShortUrl(longURL);
  const shortURL = `http://${EC2_ENDPOINT}/api/v1/${shortURLBase62}`;
  res.status(200).json({ shortURL });
};

module.exports = { getURL, postURL };
