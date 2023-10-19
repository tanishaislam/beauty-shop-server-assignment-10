const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json())

const users = [
  {
      "id": 1,
      "image": "https://i.ibb.co/QcMCW8s/360-F-284656117-s-PF8g-VWa-X627bq5q-Krlrv-Cz1e-Ffowd-Bf.jpg",
      "brandName": "Coca-Cola"
  },
  {
      "id": 2,
      "image": "https://i.ibb.co/SrprfWZ/Mc-Donald-s-logo-svg.png",
      "brandName": "McDonald's"
  },
  {
      "id": 3,
      "image": "https://i.ibb.co/VLyZd4J/fbc9e8d0804bf133a0ad53bcbd073488.jpg",
      "brandName": "Starbucks"
  },
  {
      "id": 4,
      "image": "https://i.ibb.co/2SBbSFD/1687336481003.png",
      "brandName": " PepsiCo"
  },
  {
      "id": 5,
      "image": "https://i.ibb.co/vVbhYYF/HD-wallpaper-nestle-golden-logo-artwork-brown-metal-background-creative-nestle-logo-brands-nestle.jpg",
      "brandName": "Nestlé"
  },
  {
      "id": 6,
      "image": "https://i.ibb.co/h1fKwqP/1-7lh-Dr-Tg-R-U3v-Zqv-FUUEeow.png",
      "brandName": "Kellogg's"
  }
]

app.get('/brand', (req, res)=>{
  res.send(users)
})


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.naursbo.mongodb.net/?retryWrites=true&w=majority`;

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
    const productCollection = client.db('productDB').collection('product')

   

    app.get('/products', async(req, res)=>{
      const cursor = productCollection.find();
      const result = await cursor.toArray();
      res.send(result)
    })
    app.post('/products', async(req, res)=>{
      const newProducts = req.body;
      console.log(newProducts)
      const result = await productCollection.insertOne(newProducts);
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
  res.send('beauty shop server is running')
})

app.listen(port, () => {
  console.log(`beauty shop server is running on port ${port}`)
})