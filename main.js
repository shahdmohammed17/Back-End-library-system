import express from "express"
import dotenv from "dotenv"
import { connectDB } from "./src/database/connection.js"
import { bootstrap } from "./app.controller.js"
import cors from "cors";

app.use(cors());

dotenv.config()

const app = express()

app.use(express.json())

connectDB()

bootstrap(app)
app.listen(process.env.PORT || 3000
  , () => {
  console.log("server running")
})