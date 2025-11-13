import express from "express";
import { logMiddleware } from "../middleware/middleware.js";
import {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
} from "../controllers/userController.js";

const router = express.Router();

router.get("/", logMiddleware, getAllUsers);
router.get("/:id", getUserById);
router.post("/", createUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;
