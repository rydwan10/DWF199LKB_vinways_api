const { Transaction } = require("../../models");

exports.getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.findAll();
  } catch (error) {}
};
