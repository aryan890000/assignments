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
 Request Body: { "title": "Buy groceries", "completed": false, "description": "I should buy groceries" }

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
const fs = require("fs");
const path = require("path");

const app = express();

app.use(bodyParser.json());

const filePath = path.join(__dirname, "./todos.json");

function isEmpty(value) {
  if (value === null || value === undefined) return true;
  if (typeof value === "string" && value.trim().length === 0) return true;
  if (typeof value === "object" && value.length > 0) return false;
}

function getTodos() {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(JSON.parse(data));
      }
    });
  });
}

app.get("/todos", async (req, res) => {
  try {
    const todos = await getTodos();
    return res.json(todos);
  } catch (err) {
    return res.status(500).send("Server error!");
  }
});

app.get("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const todoList = await getTodos();
    const todo = todoList.find((t) => t.id === parseInt(id));
    if (!todo) {
      return res.status(404).json({ msg: "Todo not found" });
    }
    return res.json(todo);
  } catch (err) {
    return res.status(500).send("Server error!");
  }
});

app.post("/todos", async (req, res) => {
  try {
    const { title, description } = req.body;
    if (isEmpty(title) || isEmpty(description)) {
      return res
        .status(400)
        .json({ msg: "Please provide title and description" });
    }

    const todoList = await getTodos();

    const todo = {
      id: todoList.length + 1,
      title,
      description,
      completed: false,
    };
    todoList.push(todo);

    fs.writeFile(filePath, JSON.stringify(todoList), "utf8", (err) => {
      if (err) {
        return res.status(500).send("Something went wrong!");
      } else {
        return res.status(201).json(todo);
      }
    });
  } catch (err) {
    res.status(500).send("Server error!");
  }
});

app.put("/todos/:id", async (req, res) => {
  try {
    const { title, description, completed } = req.body;
    const todoList = await getTodos();

    let todoIndex = -1;
    todoList.forEach((item, index) => {
      if (parseInt(req.params.id) === item.id) {
        todoIndex = index;
      }
    });

    if (todoIndex === -1) {
      return res.status(404).json({ msg: "Todo not found" });
    }

    const todo = todoList[todoIndex];
    todoList[todoIndex] = {
      id: todo.id,
      title: !isEmpty(title) ? title : todo.title,
      description: !isEmpty(description) ? description : todo.description,
      completed: !isEmpty(completed) ? completed : todo.completed,
    };

    fs.writeFile(filePath, JSON.stringify(todoList), "utf8", (err) => {
      if (err) {
        return res.status(500).send("Something went wrong!");
      } else {
        return res.json({ msg: "Todo updated successfully" });
      }
    });
  } catch (err) {
    return res.status(500).json({ message: "Server error!" });
  }
});

app.delete("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const todoList = await getTodos();

    const todo = todoList.find((t) => t.id === parseInt(id));
    if (!todo) {
      return res.status(404).json({ msg: "Todo not found" });
    }

    todoList.splice(todoList.indexOf(todo), 1);

    fs.writeFile(filePath, JSON.stringify(todoList), "utf8", (err) => {
      if (err) {
        return res.status(500).send("Something went wrong!");
      } else {
        return res.json({ msg: "Todo deleted successfully" });
      }
    });
  } catch (err) {
    return res.status(500).send("Server error!");
  }
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});

module.exports = app;
