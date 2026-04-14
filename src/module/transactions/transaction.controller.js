import express from "express"
import { borrowBook, returnBook, getUserTransactions } from "./transaction.service.js"
import { verifyToken } from "../../middleware/auth.middleware.js"

const router = express.Router()

router.post("/borrow",verifyToken,borrowBook)
router.put("/return/:id",verifyToken,returnBook)
router.get("/user",verifyToken,getUserTransactions)

export default router