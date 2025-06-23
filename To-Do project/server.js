const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

const DATA_FILE = 'todos.json';

// Utility: Load todos
function loadTodos() {
    if (!fs.existsSync(DATA_FILE)) return [];
    return JSON.parse(fs.readFileSync(DATA_FILE));
}

// Utility: Save todos
function saveTodos(todos) {
    fs.writeFileSync(DATA_FILE, JSON.stringify(todos, null, 2));
}

// 2. Fetch Todos
app.get('/api/todos', (req, res) => {
    const todos = loadTodos();
    res.json(todos);
});

// 3. Add Todo
app.post('/api/todos', (req, res) => {
    const todos = loadTodos();
    const newTodo = {
        id: Date.now(),
        task: req.body.task,
        priority: req.body.priority || 0
    };
    todos.push(newTodo);
    saveTodos(todos);
    res.json(newTodo);
});

// 4. Delete Todo
app.delete('/api/todos/:id', (req, res) => {
    let todos = loadTodos();
    todos = todos.filter(todo => todo.id !== parseInt(req.params.id));
    saveTodos(todos);
    res.json({ success: true });
});

// 10. Increase Priority
app.post('/api/todos/:id/increase', (req, res) => {
    const todos = loadTodos();
    const todo = todos.find(t => t.id === parseInt(req.params.id));
    if (todo) todo.priority++;
    saveTodos(todos);
    res.json(todo);
});

// 11. Decrease Priority
app.post('/api/todos/:id/decrease', (req, res) => {
    const todos = loadTodos();
    const todo = todos.find(t => t.id === parseInt(req.params.id));
    if (todo && todo.priority > 0) todo.priority--;
    saveTodos(todos);
    res.json(todo);
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
const { exec } = require('child_process');

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    exec(`start http://localhost:${PORT}`); 
});

