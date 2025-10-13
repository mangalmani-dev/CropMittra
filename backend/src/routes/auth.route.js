import express from "express"
import {forgotPassword, login, logout, me, resetPassword, signup } from "../controllers/auth.controller.js"

const router =express.Router()

router.post("/signup",signup)
router.post("/login",login)
router.post("/logout",logout)
router.get("/me",me)
router.post("/forgot-password",forgotPassword)
router.post("/reset-password/:token", resetPassword); 

export default router