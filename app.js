// app.js
import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"
import dotenv from "dotenv"
import connectDB from "./config/db.js"

// import routes
import authRoutes from "./routes/auth.route.js"
import transactionRoutes from "./routes/transaction.route.js"
import budgetRoutes from "./routes/budget.route.js"
import goalRoutes from "./routes/goal.route.js"

dotenv.config()
connectDB()

const app = express()

// Middlewares
app.use(express.json())
app.use(cookieParser())
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
)

app.get("/", (req, res) => {
  res.json({ message: "Welcome to the backend API" })
})

// Mount routes
app.use("/api/auth", authRoutes)
app.use("/api/transactions", transactionRoutes)
app.use("/api/budgets", budgetRoutes)
app.use("/api/goals", goalRoutes)

// global error handler (simple)
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ message: "Server Error" })
})

const PORT = process.env.PORT || 5001
app.listen(PORT, () =>
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
)
