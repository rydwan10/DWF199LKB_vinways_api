const express = require("express");

const router = express.Router();

const {
  getMusics,
  getMusicById,
  addMusic,
  deleteMusicById,
  updateMusicById,
} = require("../controllers/music");

const { uploadImageAndMusic } = require("../middlewares/uploadImageAndMusic");

router.get("/musics", getMusics);
router.post(
  "/musics",
  uploadImageAndMusic("thumbnail", "attachment"),
  addMusic
);
router.get("/musics/:id", getMusicById);
router.delete("/musics/:id", deleteMusicById);
router.patch(
  "/musics/:id",
  uploadImageAndMusic("thumbnail", "attachment"),
  updateMusicById
);

module.exports = router;
