const express = require('express');
const {urlList,shorten,shortUrl} = require('../controllers/Url.Controller');
const router = express.Router();
router.use(express.json());

router.get('/urls',urlList);
router.post('/shorten',shorten);
router.get('/:shortUrl',shortUrl);

module.exports = router;
