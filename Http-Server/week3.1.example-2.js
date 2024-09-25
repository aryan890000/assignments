const express = require("express");
const jwt = require("jsonwebtoken");
const jwtpassword = "123456";

const app = express();
app.use(express.json());
const ALL_USERS = [
    {
        username: "harkirat@gmail.com",
        password: "123",
        name: "Harkirat Singh",
    },
    {
        username: "Ashish@gmail.com",
        password: "12345",
        name: "Ashish Vaidya",
    },
    {
        username: "Prerna@gmail.com",
        password: "321654",
        name: "Prerna Doke",
    }
];

function userExists(username, password) {
    let userExists = false;
    for (let i = 0; i < ALL_USERS.length; i++) {
        if (ALL_USERS[i].username == username && ALL_USERS[i].password == password) {
            userExists = true;
        }
    }
    return true;
}

app.post("/signin", function (req, res) {
    const username = req.body.username;
    const password = req.body.password;

    if (!userExists(username, password)) {
        return res.status(403).json({
            msg: "User does not exist.",
        })
    }

    var token = jwt.sign({ username: username }, jwtpassword);
    res.send({
        token,
    });
});

app.get("/users", function (req, res) {
    const token = req.headers.authorization;
    try {
        const decoded = jwt.verify(token, jwtpassword);
        const username = decoded.username;
        res.send({
            users: ALL_USERS
        });
    } catch (err) {
        res.status(403).json({
            msg: "Invalid Token",
        });
    }
});

app.listen(3000);

