const { User } = require("../../models");

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({
      where: {
        email: email,
        password: password,
      },
    });

    console.log(user);
    if (!user) {
      return res.status(404).send({
        status: "Not Found",
        // temporary after using hepi / joi it will be makes sense
        message: "Email or password is incorrect!",
        data: {
          user: null,
        },
      });
    }

    res.status(200).send({
      status: "success",
      message: "User authenticated!",
      data: {
        user: {
          email: user.email,
          token: "token here ...",
        },
      },
    });
  } catch (error) {
    res.status(500).send({
      message: "Server Error",
    });
    console.log(error);
  }
};
