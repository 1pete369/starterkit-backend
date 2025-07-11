import Budget from "../models/budget.model.js"

export const createBudget = async (req, res) => {
  const { name, amount, startDate, endDate } = req.body
  const budget = await Budget.create({
    user: req.user._id,
    name,
    amount,
    startDate,
    endDate,
  })
  res.status(201).json(budget)
}

export const getBudgets = async (req, res) => {
  const budgets = await Budget.find({ user: req.user._id })
  res.json(budgets)
}

export const updateBudget = async (req, res) => {
  const { id } = req.params
  const budget = await Budget.findById(id)
  if (!budget || budget.user.toString() !== req.user._id.toString()) {
    return res.status(404).json({ message: "Budget not found" })
  }
  const updated = await Budget.findByIdAndUpdate(id, req.body, { new: true })
  res.json(updated)
}

export const deleteBudget = async (req, res) => {
  const { id } = req.params
  const budget = await Budget.findById(id)
  if (!budget || budget.user.toString() !== req.user._id.toString()) {
    return res.status(404).json({ message: "Budget not found" })
  }
  await budget.remove()
  res.json({ message: "Budget removed" })
}
