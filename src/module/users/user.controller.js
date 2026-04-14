import express from "express"
import { register,login } from "./user.service.js"
import { verifyToken } from "../../middleware/auth.middleware.js"
import { profile } from "./user.service.js"


const router = express.Router()

router.post("/register",register)
router.post("/login",login)
router.get("/profile",verifyToken,profile)

export default router