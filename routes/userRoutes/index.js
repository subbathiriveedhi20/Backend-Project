import express from "express";
import userController from "../../controllers/userController/index.js";

const router = express.Router();

router.post("/create", userController.createUser);
router.post("/login", userController.userSignIn);

export default router;
