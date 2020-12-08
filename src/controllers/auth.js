const { User } = require("../../models");
const Joi = require("joi");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    const { body } = req;

    const validationSchema = Joi.object({
      fullName: Joi.string().min(1).required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required(),
    });

    const { error } = validationSchema.validate(body, { abortEarly: false });

    if (error) {
      return res.status(400).send({
        status: "Validation Error",
        error: {
          message: error.details.map((error) => error.message),
        },
      });
    }

    const checkEmail = await User.findOne({
      where: {
        email: body.email,
      },
    });

    if (checkEmail) {
      return res.status(400).send({
        status: "failed",
        message: `Email already registered!`,
      });
    }

    const { fullName, email, password } = body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      fullName,
      email,
      status: "not active",
      role: "user",
      password: hashedPassword,
    });

    const privateKey = process.env.JWT_PRIVATE_KEY;
    const token = jwt.sign(
      {
        id: user.id,
      },
      privateKey
    );

    res.status(201).send({
      status: "success",
      message: "User successfully registered!",
      data: {
        fullName: user.fullName,
        email: user.email,
        token,
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

exports.login = async (req, res) => {
  try {
    const { body } = req;
    const validationSchema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required(),
    });

    const { error } = validationSchema.validate(body, { abortEarly: false });

    if (error) {
      return res.status(400).send({
        status: "Validation Error",
        error: {
          message: error.details.map((error) => error.message),
        },
      });
    }

    const { email, password } = req.body;

    const user = await User.findOne({
      where: {
        email,
      },
    });

    if (!user) {
      return res.status(400).send({
        status: "Login Failed",
        error: {
          message: "Invalid Login",
        },
      });
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(400).send({
        status: "Login Failed",
        error: {
          message: "Invalid Login",
        },
      });
    }

    const privateKey = process.env.JWT_PRIVATE_KEY;
    const token = jwt.sign(
      {
        id: user.id,
      },
      privateKey
    );

    res.status(200).send({
      status: "success",
      message: "Successfully Login",
      data: {
        name: user.name,
        email: user.email,
        role: user.role,
        token,
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
