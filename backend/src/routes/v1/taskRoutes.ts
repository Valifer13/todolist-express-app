import express from 'express';

export const taskRouter = express.Router();

// Debug only
const tasks = [
  {
    title: "Todo 1",
    user: "user",
  },
  {
    title: "Todo 2",
    user: "admin",
  },
  {
    title: "Todo 3",
    user: "admin",
  },
]

taskRouter.get('/tasks', (req, res) => {
  res
    .status(200)
    .json({ 
      message: "Retrieve all tasks from all users",
      data: tasks
     });
})