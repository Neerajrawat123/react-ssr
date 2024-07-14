import { Task } from "../models/task.modal.js";

export async function getAllTasks(req, res) {
  const tasks = await Task.find();

  if (!tasks) {
    return res.json({ msg: "no tasks" });
  }

  return res.json({ tasks });
}

export async function createTask(req, res) {
  const { task, description } = req.body;

  if (task === "") {
    return res.json({ msg: "task cant be empty" });
  }

  const createdTask = await Task.create({
    task: task,
    description: description,
    dueDate: new Date().getUTCDay()
  });

  const getTask = await Task.findById(createdTask._id);

  return res
    .status(200)
    .json({ msg: "task created successfully", task: getTask });
}

export async function getTask(req, res) {
  const { id } = req.params;

  const task = await Task.findById(id);

  if (!task) {
    return res.json({ msg: "task cant find" });
  }

  return res.json({ msg: "task created successfuly" , task});
}

export async function updateTask(req, res) {
  const { id } = req.params;

  const task = await Task.findByIdAndUpdate(id);

  if (!task) {
    return res.json({ msg: "task cant find" });
  }

  return res.json({ msg: "task created successfuly" });
}

export async function deleteTask(req, res) {
  const { id } = req.params;

  const task = await Task.findByIdAndDelete(id);

  if (!task) {
    return res.json({ msg: "task cant find" });
  }

  return res.json({ msg: "task deleted successfuly" });
}
