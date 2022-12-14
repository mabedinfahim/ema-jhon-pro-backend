const express= require("express");
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config(); 
const app = express();
const port=process.env.PORT || 5000;


//Middleware
const cors=require("cors")
app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.yxlplna.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run(){
    try{
        await client.connect();
        const emajhonCollection=client.db("emajhonData").collection("products");

        //Get data
        app.get("/products",async (req,res)=>{
           const query={};
           const cursor= emajhonCollection.find(query);
           const result= await cursor.toArray();
           res.send(result);

        })
    }
    finally{}
}
run().catch(console.dir)



app.listen(port, ()=>{
    console.log("listening on port",port);
})