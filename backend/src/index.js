import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
dotenv.config()
import { connectDB } from "./libs/db.js"
import authRoutes from "./routes/auth.route.js"

const app=express()

const port=process.env.PORT

// to accept json data
app.use(express.json())


// to have cookie realted data
app.use(cookieParser())

app.use(express.urlencoded({extended:true})) 

// how here we will set or end pioint

app.use("/api/auth",authRoutes)


connectDB()
app.listen(port ,()=>{
    console.log(`server is running on ${port}`)
})