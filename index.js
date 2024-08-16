const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;
const env = require('dotenv').config();

// middleware

app.use(cors({
    origin: ['http://localhost:5173'],
    credentials: true,
    optionSuccessStatus: 200,
}));

app.use(express.json());

app.get('/', (req, res) => {
    res.send('server is running');
});

// mongoDB 


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.he28ix7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

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

        const productCollection = client.db("UrbanLifestyle").collection("Products");

        app.get('/products', async (req, res) => {
            const products = await productCollection.find({}).toArray();
            res.send(products);
        });

        // Send a ping to confirm a successful connection
        // await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});