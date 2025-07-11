// routes/transaction.route.js
import express from "express"
import {
  createTransaction,
  getTransactions,
  updateTransaction,
  deleteTransaction,
} from "../controllers/transaction.controller.js"
import { protectRoute } from "../middleware/auth.middleware.js"

const router = express.Router()

router.route("/").get(protectRoute, getTransactions).post(protectRoute, createTransaction)

router
  .route("/:id")
  .put(protectRoute, updateTransaction)
  .delete(protectRoute, deleteTransaction)

export default router
