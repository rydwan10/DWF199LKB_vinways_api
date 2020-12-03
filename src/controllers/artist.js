const { Artist } = require('../../models');

exports.getArtist = async (req, res) => {
    try {
        const artist = await Artist.findAll();

        if (!artist) {
            return res.status(400).send({
                status: "Artist is empty",
                data: []
            });
        }

        res.send({
            status: "success",
            data: {
                artist
            }
        });

    } catch (err) {
        console.log(err);
        return res.status(500).send({
            error: {
                message: "Internal Server Error"
            }
        })
    }
}