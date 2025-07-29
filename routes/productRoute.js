import express from "express";
import { loginUser, registerUser, adminLogin } from "../controllers/userController.js";

const productRouter= express.Router();
productRouter.post("/register", registerUser);
productRouter.post("/login", loginUser);
productRouter.post("/admin", adminLogin);

export default productRouter;