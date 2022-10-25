const router = require('express').Router();
const { wrapAsync } = require('../util/util');
const { getURL, postURL } = require('../controllers/shortenURL3_controller');

router.route('/:shortenURL').get(wrapAsync(getURL));

router.route('/data/shortenURL3').post(wrapAsync(postURL));

module.exports = router;
