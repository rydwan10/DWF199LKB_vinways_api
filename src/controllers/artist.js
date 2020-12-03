const { Artist } = require("../../models");

exports.getArtist = async (req, res) => {
  try {
    const artists = await Artist.findAll({
      attributes: {
        // exclude: ["createdAt", "updatedAt"],
      },
    });

    if (artists.length === 0) {
      return res.status(200).send({
        status: "success",
        message: "There is no artist yet",
        data: {
          artists: [],
        },
      });
    }

    res.status(200).send({
      status: "success",
      message: "Data successfully retrieved!",
      data: {
        artists,
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      error: {
        message: "Server Error",
      },
    });
  }
};

exports.getArtistById = async (req, res) => {
  const { id } = req.params;
  try {
    const artist = await Artist.findOne({
      where: {
        id,
      },
      attributes: {
        // exclude: ["createdAt", "updatedAt"],
      },
    });

    if (!artist) {
      return res.status(404).send({
        status: "Not Found",
        message: `Artist with id: ${id} is not found!`,
        data: {
          artist: null,
        },
      });
    }

    res.status(200).send({
      status: "success",
      message: "Data successfully retrieved!",
      data: {
        artist,
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      error: {
        message: "Server Error",
      },
    });
  }
};
