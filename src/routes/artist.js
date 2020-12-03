const express = require("express");

const router = express.Router();

const { getArtist, getArtistById } = require("../controllers/artist");

router.get("/artists", getArtist);
router.get("/artists/:id", getArtistById);

module.exports = router;
