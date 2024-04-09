import express from "express"
import { deleteUser } from "../Controllers/userController.js";

const router = express.Router()

router.delete("/:id", deleteUser)

export default router