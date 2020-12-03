const express = require("express");

const router = express.Router();

const { getMusics, getMusicById } = require("../controllers/music");

router.get("/musics", getMusics);
router.get("/musics/:id", getMusicById);

module.exports = router;
