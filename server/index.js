const express = require("express");
const app = express();
const cors = require("cors");
const corsOptions = {
    origin: ["http://localhost:5173"]
};

app.use(cors(corsOptions));

// Simulate a database table with some tasks TODO
let todos = [
    { id: 1, task: 'Buy a new car', completed: false },
    { id: 2, task: 'Go to the gym', completed: false },
    { id: 3, task: 'Buy the groceries', completed: false },
    { id: 4, task: 'Wash the car', completed: false },
    { id: 5, task: 'Buying Christmas presents', completed: false }
  ];
  
  // Middleware to parse request bodies
  app.use(express.json());
  
  // Route to get all tasks
  app.get('/todos', (req, res) => {
    res.json(todos);
  });
  
// Route to get a task by ID
app.get('/todos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const todo = todos.find(t => t.id === id);
    if (todo) {
      res.json(todo);
    } else {
      res.status(404).json({   
   message: 'Error! Task not found' });
    }
  });
  
// Route to create a new task
app.post('/todos', (req, res) => {
    const newTodo = {
      id: todos.length + 1,
      task: req.body.task
    };
    todos.push(newTodo);
    res.status(201).json(newTodo);   
  
  });

// Route to update a task
app.put('/todos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const todoIndex = todos.findIndex(t => t.id === id);
    if (todoIndex !== -1) {
      todos[todoIndex] = { ...todos[todoIndex], ...req.body };
      res.json(todos[todoIndex]);
    } else {
      res.status(404).json({ message: 'Error! Task not found' });
    }
  });
  
// Route to delete a task
app.delete('/todos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const todoIndex = todos.findIndex(t => t.id === id);
    if (todoIndex !== -1) {
      todos.splice(todoIndex, 1);
      res.sendStatus(204);
    } else {
      res.status(404).json({ message: 'Error! Task not found' });
    }
  });

app.listen(8080, ()=>{
    console.log("Server is working on Port: 8080 ");
});