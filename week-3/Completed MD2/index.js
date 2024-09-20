const express = require("express");
const app = express();
app.use(express.json());
const PORT = 8081;


// Middleware
app.use(express.json());

// Routers
const adminRouter = require("./routes/adminController");
app.use('/admin', adminRouter);

const userRouter = require("./routes/userController");
app.use('/user', userRouter);


// Server setup
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        msg: "Internal Server Error"
    });
});
