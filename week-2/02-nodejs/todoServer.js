/**
  You need to create an express HTTP server in Node.js which will handle the logic of a todo list app.
  - Don't use any database, just store all the data in an array to store the todo list data (in-memory)
  - Hard todo: Try to save responses in files, so that even if u exit the app and run it again, the data remains (similar to databases)

  Each todo has a title and a description. The title is a string and the description is a string.
  Each todo should also get an unique autogenerated id every time it is created
  The expected API endpoints are defined below,
  1.GET /todos - Retrieve all todo items
    Description: Returns a list of all todo items.
    Response: 200 OK with an array of todo items in JSON format.
    Example: GET http://localhost:3000/todos
    
  2.GET /todos/:id - Retrieve a specific todo item by ID
    Description: Returns a specific todo item identified by its ID.
    Response: 200 OK with the todo item in JSON format if found, or 404 Not Found if not found.
    Example: GET http://localhost:3000/todos/123
    
  3. POST /todos - Create a new todo item
    Description: Creates a new todo item.
    Request Body: JSON object representing the todo item.
    Response: 201 Created with the ID of the created todo item in JSON format. eg: {id: 1}
    Example: POST http://localhost:3000/todos
    Request Body: { "title": "Buy groceries", "completed": false, description: "I should buy groceries" }
    
  4. PUT /todos/:id - Update an existing todo item by ID
    Description: Updates an existing todo item identified by its ID.
    Request Body: JSON object representing the updated todo item.
    Response: 200 OK if the todo item was found and updated, or 404 Not Found if not found.
    Example: PUT http://localhost:3000/todos/123
    Request Body: { "title": "Buy groceries", "completed": true }
    
  5. DELETE /todos/:id - Delete a todo item by ID
    Description: Deletes a todo item identified by its ID.
    Response: 200 OK if the todo item was found and deleted, or 404 Not Found if not found.
    Example: DELETE http://localhost:3000/todos/123

    - For any other route not defined in the server return 404

  Testing the server - run `npm run test-todoServer` command in terminal
 */
const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());
const port = 3000;
const todoItem = {
  title: "",
  description: "",
};
let todo = [];
let id = 0;
function createTodo(title, description) {
  const todoItem = { id: id, title: title, description: description };
  todo.push(todoItem);
  id++;
  // return JSON.stringify(todo[id]);
}
function getTodo(id) {
  for (let i = 0; i < todo.length; i++) {
    if (todo[i].id == id) {
      return JSON.stringify(todo[id]);
    }
  }
  // return "Todo Item not found :/";
}
function getallTodo() {
  return todo.map((todoItem) => JSON.stringify(todoItem));
}
function deleteTodo(id) {
  for (let i = 0; i < todo.length; i++) {
    if (todo[i].id == id) {
      todo.splice(i, 1);
      return true;
    }
  }
  return false;
}
function updateTodo(id, title, completed) {
  for (let i = 0; i < todo.length; i++) {
    if (todo[i].id == id) {
      todo[i].title = title;
      todo[i].completed = completed;
      return true; // Return true indicating todo item was found and updated
    }
  }
  return false; // Return false indicating todo item was not found
}

app.get("/todos", (req, res) => {
  const allTodos = getallTodo();
  res.status(200).json(allTodos);
});
app.post("/todos", (req, res) => {
  const newTodo = {
    title: req.body.title,
    description: req.body.description,
  };
  createTodo(newTodo);
  res.status(201).json(newTodo);
});

app.get("/todos/:id", (req, res) => {
  const id = req.params.id; //extract id from url
  const getTodoItem = getTodo(id);
  if (getTodoItem) {
    res.status(200).json(getTodoItem);
  } else {
    res.status(404).send("Todo item not found");
  }
});

app.put("/todos/:id", (req, res) => {
  const id = req.params.id; //extract id from url
  const { title, completed } = req.body;
  const updateTodoItem = updateTodo(id, title, completed);
  if (updateTodoItem) {
    res.status(200).send("Todo item updated successfully");
  } else {
    // If not found, respond with 404 Not Found
    res.status(404).send("Todo item not found");
  }
});
app.delete("/todos/:id", (req, res) => {
  const id = req.params.id;
  const deleteTodoItem = deleteTodo(id);
  if (deleteTodoItem) {
    res.status(200).send("Todo Item Deleted Successfully");
  } else {
    res.status(404).send("Todo item not found");
  }
});

//DEBUG STATEMENTS
// createTodo("fight", "boxing day !!!");
// createTodo("paly", "football day !!!");
// createTodo("sleep", "soundly !!!");
// createTodo("drink", "water !!!");
// createTodo("dance", "don't please !!!");

// console.log(getTodo(2));
// console.log(getallTodo());
// deleteTodo(1);

// console.log(getallTodo());
// deleteTodo(1);
// console.log(getallTodo());
// updateTodo(2, "Don't Drink MF", "Because you will pee");
// console.log(getallTodo());

// console.log(`Array item check:  ${JSON.stringify(todo[2])}`);
app.listen(port);

module.exports = app;
