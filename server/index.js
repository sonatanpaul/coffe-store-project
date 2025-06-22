const express = require("express");
const { MongoClient, ServerApiVersion } = require("mongodb");
const cors = require("cors");
require("dotenv").config();
const port = process.env.PORT || 3000;
const app = express();

// middleware
app.use(cors());
app.use(express.json());

// Mongodb Start -
const uri = process.env.MONGODB_URI;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  const database = client.db("coffee-store");
  const coffeeCollection = database.collection("coffees");

  app.get("/coffees", async (req, res) => {
    const allCoffees = await coffeeCollection.find().toArray();
    console.log(allCoffees);
    res.send(allCoffees);
  });

  app.post("/add-coffee", async (req, res) => {
    const coffeesData = req.body;
    const result = await coffeeCollection.insertOne(coffeesData);
    res.status(201).send({ ...result, message: "Data Paisi Vai" });
  });

  try {
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Welcome To Server");
});

app.listen(port, () => {
  console.log(`Server running is ${port}`);
});
