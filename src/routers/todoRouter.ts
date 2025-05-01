import express from "express";
import { TodoController } from "../controllers";
const router = express.Router();

const controller = new TodoController();
router.use("/todo", controller.getTodos);

export default router;
