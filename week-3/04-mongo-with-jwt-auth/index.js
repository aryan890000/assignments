const express = require('express')
const app = express()

const adminRouter = require('./routes/admin')
const userRouter = require('./routes/user')

app.use('/admin', adminRouter)
app.use('/users', userRouter)

app.listen(3000, () => {
    console.log("Listening on port 3000")
})