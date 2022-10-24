const router = require('express').Router();
const { getURL, postURL } = require('../controllers/shortenURL1_controller');

router.get('/v1/:shortenURL', getURL);

router.post('/data/shortenURL1', postURL);


module.exports = router;

