import express from "express";
import {
  createCurrentUser,
  updateCurrentUser,
  getCurrentUser,
} from "../controller/MyUserController";
import { jwtCheck, jwtParse } from "../middleware/auth";
import { validateMyUserRequest } from "../middleware/validation";

const router = express.Router();

router.post("/", jwtCheck, createCurrentUser);
router.put("/", jwtCheck, jwtParse, validateMyUserRequest, updateCurrentUser);
router.get("/", jwtCheck, jwtParse, getCurrentUser);

export default router;
