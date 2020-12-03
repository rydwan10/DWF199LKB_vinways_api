const express = require("express");
const router = express.Router();

const { getUsers, deleteUser } = require("../controllers/user");

router.get("/users", getUsers);
router.delete("/users/:id", deleteUser);

module.exports = router;
