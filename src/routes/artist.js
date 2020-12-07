const express = require("express");

const router = express.Router();

const {
  getArtist,
  getArtistById,
  addArtist,
  deleteArtistById,
  updateArtistById,
} = require("../controllers/artist");

router.get("/artists", getArtist);
router.post("/artists", addArtist);
router.get("/artists/:id", getArtistById);
router.delete("/artists/:id", deleteArtistById);
router.patch("/artists/:id", updateArtistById);

module.exports = router;
