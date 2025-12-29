import express from "express";
import userRoutes from "../routes/userRoutes/index.js";

const router = express.Router();

router.use("/users", userRoutes);

export default router;
