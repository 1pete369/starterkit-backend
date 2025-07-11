import Transaction from "../models/transaction.model.js"

export const createTransaction = async (req, res) => {
  const { type, amount, category, date, notes } = req.body
  const transaction = await Transaction.create({
    user: req.user._id,
    type,
    amount,
    category,
    date,
    notes,
  })
  res.status(201).json(transaction)
}

export const getTransactions = async (req, res) => {
  const transactions = await Transaction.find({ user: req.user._id }).sort({
    date: -1,
  })
  res.json(transactions)
}

export const updateTransaction = async (req, res) => {
  const { id } = req.params
  const transaction = await Transaction.findById(id)
  if (!transaction || transaction.user.toString() !== req.user._id.toString())
    return res.status(404).json({ message: "Transaction not found" })
  const updated = await Transaction.findByIdAndUpdate(id, req.body, {
    new: true,
  })
  res.json(updated)
}

export const deleteTransaction = async (req, res) => {
  const { id } = req.params
  const transaction = await Transaction.findById(id)
  if (!transaction || transaction.user.toString() !== req.user._id.toString())
    return res.status(404).json({ message: "Transaction not found" })
  await transaction.remove()
  res.json({ message: "Transaction removed" })
}
