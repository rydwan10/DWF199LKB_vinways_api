const express = require("express");

const router = express.Router();

const {
  getMusics,
  getMusicById,
  addMusic,
  deleteMusicById,
  updateMusicById,
} = require("../controllers/music");

router.get("/musics", getMusics);
router.post("/musics", addMusic);
router.get("/musics/:id", getMusicById);
router.delete("/musics/:id", deleteMusicById);
router.patch("/musics/:id", updateMusicById);

module.exports = router;
