const express = require("express");
const router = express.Router();
const taskController = require("../controllers/task.cont");

router.post("/addtask", taskController.addTask);
router.put("/updatetask/:id", taskController.updateTask);
router.delete("/deletetask/:id", taskController.deleteTask);
router.get("/gettask/:id", taskController.getTasks);

module.exports = router;
