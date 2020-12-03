const { Music, Artist } = require("../../models");

exports.getMusics = async (req, res) => {
  try {
    const musics = await Music.findAll({
      attributes: {
        exclude: ["artistId", "createdAt", "updatedAt", "ArtistId"],
      },
      include: {
        model: Artist,
        as: "artist",
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      },
    });

    if (musics.length === 0) {
      return res.status(200).send({
        status: "success",
        message: "There is no music yet",
        data: {
          musics: [],
        },
      });
    }

    res.status(200).send({
      status: "success",
      message: "Data successfully retrieved!",
      data: {
        musics,
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

exports.getMusicById = async (req, res) => {
  const { id } = req.params;

  try {
    const music = await Music.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: ["artistId", "createdAt", "updatedAt", "ArtistId"],
      },
      include: {
        model: Artist,
        as: "artist",
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      },
    });

    if (!music) {
      return res.status(404).send({
        status: "Not Found",
        message: `Music with id: ${id} is not found!`,
        data: {
          music: null,
        },
      });
    }

    res.status(200).send({
      status: "success",
      message: `Music with id ${id} successfully retrieved!`,
      data: {
        music,
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
exports.addMusic = async (req, res) => {
  // TODO for attachment is using multer later on. For now let's using string as it's thumbnail
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
        message: `You must fill all the fields! (title, year, artistId, thumbnail, attachment)`,
        data: {
          artist: null,
        },
      });
    }

    const newMusic = await Music.create(data);

    res.status(201).send({
      status: "success",
      message: "New music is successfully added!",
      data: {
        newMusic,
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

exports.deleteMusicById = async (req, res) => {
  const { id } = req.params;
  try {
    const music = await Music.findOne({
      where: {
        id,
      },
    });

    if (!music) {
      return res.status(404).send({
        status: "Not Found",
        message: `Artist with id: ${id} is not found!`,
        data: {
          music: null,
        },
      });
    }

    await Music.destroy({
      where: {
        id,
      },
    });

    res.status(200).send({
      status: "success",
      message: `Music with id ${id} successfully deleted!`,
      data: {
        deletedMusic: music,
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

exports.updateMusicById = async (req, res) => {
  const { id } = req.params;
  const data = req.body;

  try {
    const music = await Music.findOne({
      where: {
        id,
      },
    });

    if (!music) {
      return res.status(404).send({
        status: "Not Found",
        message: `Artist with id: ${id} is not found!`,
        data: {
          music: null,
        },
      });
    }

    await Music.update(data, {
      where: {
        id,
      },
    });

    const updatedMusic = await Music.findOne({
      where: {
        id,
      },
    });

    res.status(200).send({
      status: "success",
      message: `Music with id: ${id} successfully updated!`,
      data: {
        updatedMusicData: updatedMusic,
        oldMusicData: music,
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
