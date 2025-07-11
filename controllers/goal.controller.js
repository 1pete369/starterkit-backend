/* controllers/goal.controller.js */
import Goal from "../models/goal.model.js"

// @desc    Create a new goal
// @route   POST /api/goals
// @access  Private
export const createGoal = async (req, res) => {
  const { name, targetAmount } = req.body
  try {
    const goal = await Goal.create({
      user: req.user._id,
      name,
      targetAmount,
      savedAmount: req.body.savedAmount || 0,
    })
    res.status(201).json(goal)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

// @desc    Get all goals for current user
// @route   GET /api/goals
// @access  Private
export const getGoals = async (req, res) => {
  try {
    const goals = await Goal.find({ user: req.user._id })
    res.json(goals)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// @desc    Update an existing goal
// @route   PUT /api/goals/:id
// @access  Private
export const updateGoal = async (req, res) => {
  try {
    const { id } = req.params
    const goal = await Goal.findById(id)
    if (!goal || goal.user.toString() !== req.user._id.toString()) {
      return res.status(404).json({ message: "Goal not found" })
    }
    const updated = await Goal.findByIdAndUpdate(id, req.body, { new: true })
    res.json(updated)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

// @desc    Delete a goal
// @route   DELETE /api/goals/:id
// @access  Private
export const deleteGoal = async (req, res) => {
  try {
    const { id } = req.params
    const goal = await Goal.findById(id)
    if (!goal || goal.user.toString() !== req.user._id.toString()) {
      return res.status(404).json({ message: "Goal not found" })
    }
    await goal.remove()
    res.json({ message: "Goal removed" })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
