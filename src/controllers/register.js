const { User } = require("../../models");

// ! WARNING this controller should has a Token later
exports.register = async (req, res) => {
  const data = req.body;
  try {
    // jika objek data tidak memiliki key dan jika objek data kurang dari 5 fields
    if (
      data === undefined ||
      Object.keys(data).length === 0 ||
      Object.keys(data).length < 3
    ) {
      return res.status(400).send({
        status: "Bad Request",
        message: `You must fill all the fields! (email, password, fullName)`,
        data: {
          user: null,
        },
      });
    }

    const newUser = await User.create(data);

    res.status(201).send({
      status: "success",
      message: "New user is successfully added!",
      data: {
        user: {
          email: newUser.email,
          token: "token here...",
        },
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
