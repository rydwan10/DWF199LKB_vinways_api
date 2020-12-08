const express = require("express");
const router = express.Router();

const { getUsers, deleteUser } = require("../controllers/user");
const { auth } = require("../middlewares/auth");
// const { isAdmin } = require("../middlewares/isAdmin");

router.get("/users", getUsers);
router.delete("/users/:id", auth, deleteUser);

module.exports = router;
