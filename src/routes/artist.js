const express = require('express');
const router = express.Router();

const { getArtist } = require('../controllers/artist');



router.get('/artists', getArtist);

module.exports = router;