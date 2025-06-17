import express from 'express';

export const todoRouter = express.Router();

// Debug only
const todos = [
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

todoRouter.get('/todos', (req, res) => {
  res
    .status(200)
    .json({ 
      message: "Retrieve all tasks from all users",
      data: todos
     });
})