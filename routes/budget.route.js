// routes/budget.route.js
import express from "express"
import {
  createBudget,
  getBudgets,
  updateBudget,
  deleteBudget,
} from "../controllers/budget.controller.js"
import { protectRoute } from "../middleware/auth.middleware.js"

const router = express.Router()

router.route("/").get(protectRoute, getBudgets).post(protectRoute, createBudget)

router.route("/:id").put(protectRoute, updateBudget).delete(protectRoute, deleteBudget)

export default router
