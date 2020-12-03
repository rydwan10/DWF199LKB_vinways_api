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
      message: "Artist successfully retrieved!",
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

//! Attention below are the controllers that must have authorization header later!
exports.addArtist = async (req, res) => {
  const data = req.body;
  try {
    // jika objek data tidak memiliki key dan jika objek data kurang dari 5 fields
    if (
      data === undefined ||
      Object.keys(data).length === 0 ||
      Object.keys(data).length < 5
    ) {
      return res.status(400).send({
        status: "Bad Request",
        message: `You must fill all the fields! (name, old, category, startCareer, thumbnail)`,
        data: {
          artist: null,
        },
      });
    }

    const newArtist = await Artist.create(data);

    res.status(201).send({
      status: "success",
      message: "New artist is successfully added!",
      data: {
        newArtist,
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

exports.deleteArtistById = async (req, res) => {
  const { id } = req.params;
  try {
    const artist = await Artist.findOne({
      where: {
        id,
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

    await Artist.destroy({
      where: {
        id,
      },
    });

    res.status(200).send({
      status: "success",
      message: `Artist with id: ${id} successfully deleted!`,
      data: {
        deletedArtist: artist,
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

exports.updateArtistById = async (req, res) => {
  const { id } = req.params;
  const data = req.body;

  try {
    const artist = await Artist.findOne({
      where: {
        id,
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

    await Artist.update(data, {
      where: {
        id,
      },
    });

    const updatedArtist = await Artist.findOne({
      where: {
        id,
      },
    });

    res.status(200).send({
      status: "success",
      message: `Artist with id: ${id} successfully updated!`,
      data: {
        updatedArtistData: updatedArtist,
        oldArtistData: artist,
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
