const express = require("express");

const router = express.Router();

const {
  getTransactions,
  getTransactionById,
  addTransaction,
  updateTransaction,
  deleteTransaction,
} = require("../controllers/transaction");

// middleware
const { uploadImage } = require("../middlewares/uploadImage");
const { auth } = require("../middlewares/auth");
const { isAdmin } = require("../middlewares/isAdmin");

router.get("/transactions", auth, isAdmin, getTransactions);
router.post(
  "/transactions",
  auth,
  isAdmin,
  uploadImage("proofOfTransaction"),
  addTransaction
);
router.get("/transactions/:id", auth, isAdmin, getTransactionById);
router.patch("/transactions/:id", auth, isAdmin, updateTransaction);
router.delete("/transactions/:id", auth, isAdmin, deleteTransaction);

module.exports = router;
