const express = require('express')
const cors = require('cors');
const app = express();
const PORT = 3031;
app.use(cors());



app.get('/notifications',(req,res)=>{

    const notifications  = {
        network : (Math.floor(Math.random() * 10)),
        jobs : (Math.floor(Math.random() * 10)),
        messaging : (Math.floor(Math.random() * 10)),
        notifications : (Math.floor(Math.random() * 10)),
    }
    res.json({notifications});
});

app.listen(PORT , ()=>{
    console.log(`http://localhost:${PORT}/notifications`)
})