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
