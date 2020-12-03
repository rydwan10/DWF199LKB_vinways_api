const { User } = require('../../models');

exports.getUsers = async (req, res) => {
    try {
        const users = await User.findAll({
            attributes: { exclude: ['password'] }
        });

        if (!users) {
            return res.res.status(400).send({
                message: "There is no Users",
                data: []
            })
        };

        res.send({
            data: {
                message: "success",
                users
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