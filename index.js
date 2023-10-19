const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion , ObjectId} = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;
//middlewares 
app.use(cors());
app.use(express.json())

// mediaMingle
// mLIRJK88dIoLhvUh

const uri = "mongodb+srv://mediaMingle:mLIRJK88dIoLhvUh@cluster0.9causbv.mongodb.net/?retryWrites=true&w=majority";
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
        await client.connect();
        
        
        const productsCollection = client.db('productsDB').collection('products')
        const cartCollection = client.db('cartDB').collection('carts')
        app.get('/products', async(req,res)=>{
            const cursor = productsCollection.find()
            const result = await cursor.toArray();
            res.send(result)
        })

        app.post('/products' , async(req,res)=>{
            const product =req.body;
            console.log(product)
            const result= await productsCollection.insertOne(product)
            console.log(result)
            res.send(result)
        })

        app.get('/products/:id', async(req,res)=>{
            const id = req.params.id;
            const query = {_id: new ObjectId(id)}
            const result = await productsCollection.findOne(query)
            res.send(result)
        })
        
        app.put('/products/:id', async(req,res)=>{
            const id= req.params.id;
            const product = req.body;
            const filter = {_id: new ObjectId(id)}
            const options = {upsert: true};
            const updateProduct = {
                $set:{
                     photo : product.photo,
                     productName : product.productName,
                     type : product.type,
                     brand : product.brand,
                     price : product.price,
                     rating : product.rating
                }
            }
            const result = await productsCollection.updateOne(filter,updateProduct,options)
            res.send(result)
        })
        //add to cart

        app.get('/carts', async(req,res)=>{
            const cursor = cartCollection.find();
            
            const result = await cursor.toArray();
            res.send(result)
        })

        app.post('/carts', async(req,res)=>{
            const cart = req.body;
           
            const result = await cartCollection.insertOne(cart)
           
            res.send(result)
            
        })
        app.delete('/carts/:id', async(req,res)=>{
            const id = req.params.id;
            const query = {_id : id}
            const result= await cartCollection.deleteOne(query)
            res.send(result)
        })
        
      


        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);






app.get('/', (req, res) => {
    res.send("server is running")
})

app.listen(port, () => {
    console.log(`port is running on port: ${port}`)
})