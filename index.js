const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

//middlewares 
app.use(cors());
app.use(express.json())

// mediaMingle
// mLIRJK88dIoLhvUh

app.get('/', (req,res)=>{
    res.send("server is running")
})

app.listen(port, ()=>{
    console.log(`port is running on port: ${port}`)
})