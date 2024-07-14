import { Router } from "express";
import { createTask, deleteTask, getAllTasks, getTask, updateTask } from "../controllers/task.controller.js";
const router = Router()

router.route('/tasks').get(getAllTasks)
router.route('/tasks').post(createTask)
router.route('/tasks/:id').get(getTask)
router.route('/tasks/:id').delete(deleteTask)
router.route('/tasks/:id').put(updateTask)

export default router