const expres = require("express");
require("dotenv").config()
const app = expres();
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const port = process.env.port || 5000;


//middlewares
app.use(expres.json());
app.use(cors());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.hzybyvu.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        // await client.connect();
        const usersCollection = client.db("taskForgeDB").collection("userCollection")
        
    //users related endpoints

        //to save an new user info
        app.put('/users', async(req, res)=>{
            const userData = req.body;
            const filter = {email : userData.email};
            const findUser = await usersCollection.findOne(filter)
            if(findUser){
                return res.send({message: "user found"})
            }
            const result = await usersCollection.insertOne(userData)
            res.send(result);
        })



        // Send a ping to confirm a successful connection
        // await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);



app.get('/', (req, res) => {
    res.send("Task Forge Server is Serving")
})

app.listen(port, () => {
    console.log(`task forge sarver is running on port: ${port}`);
})