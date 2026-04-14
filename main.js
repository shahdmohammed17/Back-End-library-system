import express from "express"
import dotenv from "dotenv"
import { connectDB } from "./src/database/connection.js"
import { bootstrap } from "./app.controller.js"

dotenv.config()

const app = express()

app.use(express.json())

connectDB()

bootstrap(app)
app.listen(process.env.PORT, () => {
  console.log("server running")
})