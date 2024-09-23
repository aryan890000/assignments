const express = require("express");
const zod = require("zod");
const app = express();

// const schema = zod.array(zod.number());

const schema = zod.object({
    email: zod.string(),
    password: zod.string(),
    country: zod.literal("India").or(zod.literal("USA")),
    kidneys: zod.array(zod.number()),
})

//middleware shortcut, this enusres this particular middleware is used in all subsequent functions which are declared below.

app.use(express.json());

app.get("/health-checkup", function (req, res) {
    const kidneyId = req.query.kidneyId;
    const username = req.headers.username;
    const password = req.headers.password;

    // Credential validation
    if (username !== 'admin' || password !== 'admin123') {
        return res.status(403).json({
            msg: "Invalid Credentials!"
        });
    }

    // kidneyId validation
    if (kidneyId != 1 && kidneyId != 2) {
        return res.status(411).json({
            msg: "Invalid Kidney!"
        });
    }

    // Successful response
    return res.json({
        msg: "Kidney is good. Successfully logged in."
    });
});

app.post("/health-checkup", function (req, res) {
    // kidneys=[1,2] An array of kidneys.
    const kidneys = req.body.kidneys;
    const response = schema.safeParse(kidneys);
    res.send({
        response
    })
})

app.listen(3000);
