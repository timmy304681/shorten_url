const router = require('express').Router();
const { wrapAsync } = require('../util/util');
const {
  getShortenURL,
  postShortenURL,
} = require('../controllers/shortenURL2_controller');

router.route('/:targetURL').get(wrapAsync(getShortenURL));

router.route('/data/shortenURL2').post(wrapAsync(postShortenURL));


module.exports = router;
