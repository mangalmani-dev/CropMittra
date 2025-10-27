import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import cors from "cors"
dotenv.config()
import { connectDB } from "./libs/db.js"
import authRoutes from "./routes/auth.route.js"
import cropsRoutes from "./routes/crops.route.js"
import orderRoutes from "./routes/orders.route.js"
import analyticsRoutes from "./routes/analytics.route.js"

const app=express()

const port=process.env.PORT

// to accept json data
app.use(express.json())


// to have cookie realted data
app.use(cookieParser())

app.use(express.urlencoded({extended:true})) 
 
// connecting to cors
app.use(cors({
  origin: "http://localhost:5173", // your Vite frontend
  credentials: true, // allow cookies/tokens
}));

// how here we will set or end pioint

app.use("/api/auth",authRoutes)
app.use("/api/crops",cropsRoutes)
app.use("/api/orders/",orderRoutes)
app.use("/api/analytics", analyticsRoutes);


connectDB()
app.listen(port ,()=>{
    console.log(`server is running on ${port}`)    
})