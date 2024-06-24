const express = require('express');
const mongoose = require('mongoose');
const Product = require('./models/product.model.js');
const productRoute = require("./routes/product.route.js");
const app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//routes
app.use("/api/products", productRoute);

app.get('/',(req,res) => {
    res.send("Hello from Node API Server Updated");
});

app.post('/api/products', async (req, res) => {
    try {
        const product = await Product.create(req.body);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}); 

app.get('/api/products/:id', async (req, res) => {
    try{
        const { id } = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product);
    } catch {
        res.status(500).json({message: error.message});
    }
});

app.put('/api/products/:id', async (req, res) => {
    try{
        const { id } = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body);

        if (!product) {
            return res.status(404).json({message: "Product not found"});
        }

        const updatedProduct = await Product.findById(id);
        res.status(200).json(updatedProduct);
    } catch {
        res.status(500).json({message: error.message});
    }
});

app.delete('/api/products/:id', async (req, res) => {
    try{
        const { id } = req.params;
        const product = await Product.findByIdAndDelete(id);
        if (!product) {
            return res.status(404).json({message: "Product not found"});
        }
        res.status(200).json({message: "Product deleted successfully"});
    } catch {
        res.status(500).json({message: error.message});
    }
});

mongoose.connect("mongodb+srv://DalarCoin:Dennis625@doctypist.yhi3pxj.mongodb.net/DocTypist?retryWrites=true&w=majority&appName=DocTypist")
.then(() => {
    console.log("Connected to the database!");
    app.listen(3000, ()=>{
        console.log("listening to port 3000");
    });
}) 
.catch(() => {
    console.log("Connection failed");
})