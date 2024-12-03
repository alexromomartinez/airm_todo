import './App.css'
import React, { useState, useEffect } from 'react';
import {
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,  
  IconButton,  
  Checkbox,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';


interface Todo {
  id: number;
  task: string;
  completed: boolean;
}

const App: React.FC = () => 
{
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    // Fetch todos from your API here
    const fetchTodos = async () => {
      const response = await fetch('http://localhost:8080/todos');
      const data = await response.json();
      setTodos(data);  

    };

    fetchTodos();
  }, []);

  const handleToggleComplete = (id: number) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  };
  const handleAddTodo = () => {
    if (newTodo.trim() !== '') {
      const newTodoItem: Todo = {
        id: todos.length + 1,
        task: newTodo,
        completed:false
      };
      setTodos([...todos, newTodoItem]);
      setNewTodo('');

      // Post new todo to API
      fetch('http://localhost:8080/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTodoItem),
      });
    }
  };

  const handleDeleteTodo = (id: number) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);

    // Delete todo from API
    fetch(`http://localhost:8080/todos/${id}`, {
      method: 'DELETE',
    });
  };


  return (
    <>
      <h1>Todo App - AIRM</h1>
      <TextField
        label="Add Todo"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
      />
      <Button variant="contained" color="secondary" onClick={handleAddTodo}>
          Add Task
      </Button>
      
      <List>
        {todos.map((todo) => (
          <ListItem key={todo.id} role={undefined} dense >
            <Checkbox
              edge="start"
              checked={todo.completed}
              onChange={() => handleToggleComplete(todo.id)}
            />           
            <ListItemText className={todo.completed ? 'completed' : ''}>
                {todo.task}
            </ListItemText>
            <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteTodo(todo.id)}>
              <DeleteIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>
      
    </>
  )
}

export default App
