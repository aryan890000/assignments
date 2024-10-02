  const express = require('express');
  const bodyParser = require('body-parser');
  const fs = require('fs');
  const app = express();
  
  app.use(bodyParser.json());

  app.get("/todos", (req, res) => {
    fs.readFile('./todos.json', 'utf-8', (err, todos) => {
        if(err) {
            res.status(500).send("Something broke")
            return
        }
        res.status(200).json(JSON.parse(todos))
    })
  })

  app.get("/todos/:id", (req, res) => {
    const id = parseInt(req.params.id)

    fs.readFile('./todos.json', 'utf-8', (err, todos) => {
        if(err) {
            res.status(500).send("Something broke")
            return
        }
        const todo = JSON.parse(todos).find((td) => id === td.id)

        if(todo === void 0) {
            res.status(404).send("Todo not found")
        } else {
            res.status(200).json(todo)
        }
    })
  })

  app.post("/todos", (req, res) => {
    fs.readFile('./todos.json', (err, todos) => {
        if(err) {
            res.status(500).send("Something broke")
            return
        }  
        const title = req.body.title
        const description = req.body.description

        const todo = {
            id: Date.now(),
            title,
            description
        }    

        const jsonTodos = JSON.parse(todos);
        jsonTodos.push(todo)
        
        fs.writeFile('./todos.json', JSON.stringify(jsonTodos), (err) => {
            if(err) {
                res.status(500).send("Something broke")
                return
            }            
            res.status(201).json({id: todo.id})
        })
    })
  })

  app.put("/todos/:id", (req, res) => {
    fs.readFile('./todos.json', (err, todos) => {
        if(err) {
            res.status(500).send("Something broke")
            return
        }  
        const id = parseInt(req.params.id)
        const index = JSON.parse(todos).findIndex((todo) => id === todo.id)
        
        const jsonTodos = JSON.parse(todos)
        if(index === -1) {
            res.status(404).send("Todo not found")
        } else {
            if(req.body.title) {
                jsonTodos[index].title = req.body.title
            }
            if(req.body.description) {
                jsonTodos[index].description = req.body.description
            }
    
            fs.writeFile('./todos.json', JSON.stringify(jsonTodos), (err) => {
                if(err) {
                    res.status(500).send("Something broke")
                    return
                }            
                res.status(200).json(jsonTodos[index])
            })
        }
    })
  })

  app.delete("/todos/:id", (req, res) => {
    fs.readFile("./todos.json", "utf-8", (err, todos) => {
        if(err) {
            res.status(500).send("Something broke")
            return
        }
        const jsonTodos = JSON.parse(todos)
        const id = parseInt(req.params.id)
        const updatedTodos = jsonTodos.filter((todo) => todo.id !== id)
    
        if(updatedTodos.length === todos.length) {
          res.status(404).send("Todo not dound")
        } else {
          fs.writeFile("./todos.json", JSON.stringify(updatedTodos), (err) => {
            if(err) {
                res.status(500).send("Something broke")
                return
            }
            res.status(200).json(updatedTodos)
          })
        }
    })
  })
  
  app.all('*', (req, res) => {
    res.status(404).send("Route not found")
  })
  
  module.exports = app;