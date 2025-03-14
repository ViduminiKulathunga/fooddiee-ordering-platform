import express from "express";
import { createCurrentUser } from "../controller/MyUserController";

const router = express.Router();

router.post("/", createCurrentUser);

export default router;
