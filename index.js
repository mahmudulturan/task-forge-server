const expres = require("express");
const app = expres();
const cors = require('cors');
const port = process.env.port || 5000;


//middlewares
app.use(expres.json());
app.use(cors());


app.get('/', (req, res)=>{
    res.send("Task Forge Server is Serving")
})

app.listen(port, ()=>{
    console.log(`task forge sarver is running on port: ${port}`);
})