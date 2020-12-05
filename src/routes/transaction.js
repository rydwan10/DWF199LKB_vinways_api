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

router.get("/transactions", getTransactions);
router.post("/transactions", uploadImage("proofOfTransaction"), addTransaction);
router.get("/transactions/:id", getTransactionById);
router.patch("/transactions/:id", updateTransaction);
router.delete("/transactions/:id", deleteTransaction);

module.exports = router;
