const { User } = require("../../models");

exports.isAdmin = async (req, res, next) => {
  try {
    const { id } = req.userId;
    console.log(id);
    const adminUser = await User.findOne({
      where: {
        id,
      },
    });
    console.log(adminUser);

    if (adminUser.role == "admin") {
      next();
    } else {
      res.status(401).send({
        status: "Not Allowed",
        error: {
          message: "You're not allowed to enter this route",
        },
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({
      error: {
        message: "Server Error",
      },
    });
  }
};
