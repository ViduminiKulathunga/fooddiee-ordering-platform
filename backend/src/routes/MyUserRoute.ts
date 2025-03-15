import express from "express";
import { createCurrentUser } from "../controller/MyUserController";
import { jwtCheck } from "../middleware/auth";

const router = express.Router();

router.post("/", jwtCheck, createCurrentUser);

export default router;
