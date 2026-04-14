import express from "express"
import { addBook,getBooks,updateBook,deleteBook } from "./book.service.js"
import { verifyToken } from "../../middleware/auth.middleware.js"

const router = express.Router()

router.post("/add",verifyToken,addBook)
router.get("/all",verifyToken,getBooks)
router.put("/update/:id",verifyToken,updateBook)
router.delete("/delete/:id",verifyToken,deleteBook)

export default router
