// routes/goal.route.js
import express from "express"
import {
  createGoal,
  getGoals,
  updateGoal,
  deleteGoal,
} from "../controllers/goal.controller.js"
import { protectRoute } from "../middleware/auth.middleware.js"

const router = express.Router()

router.route("/").get(protectRoute, getGoals).post(protectRoute, createGoal)

router.route("/:id").put(protectRoute, updateGoal).delete(protectRoute, deleteGoal)

export default router
