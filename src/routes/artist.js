const express = require("express");

const router = express.Router();

const {
  getArtist,
  getArtistById,
  addArtist,
  deleteArtistById,
  updateArtistById,
} = require("../controllers/artist");

const { uploadImage } = require("../middlewares/uploadImage");

router.get("/artists", getArtist);
router.post("/artists", uploadImage("thumbnail"), addArtist);
router.get("/artists/:id", getArtistById);
router.delete("/artists/:id", deleteArtistById);
router.patch("/artists/:id", uploadImage("thumbnail"), updateArtistById);

module.exports = router;
