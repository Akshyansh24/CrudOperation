const express = require("express");
const morgan = require("morgan");
const bodyParser = require('body-parser');
const app = express();
require('./config/database')
const products = require("./models/productModel");
const cart = require("./models/carttModel");

// Port Number
const port = 5000

// middleware
app.use(express.static('public'));
app.use(morgan('dev'));
app.use(express.json());
app.use(bodyParser.json())
app.use(express.urlencoded({extended:true}));
app.set('view engine', 'ejs');


// Add Product
app.post("/add", async(req,res)=>{
    const {title, price} = req.body;
    const product = new products({
        title,
        price
    });
    const Productsave = await product.save();
    res.redirect("/")
})

// For Get all Products
app.get("/", async(req, res)=>{
   const allproducts = await products.find({})
   res.render("home",{title:"Shop-Now", products: allproducts })
})


// Render Ejs 
app.get("/add",(req, res)=>{
    res.render("addProduct")
})


// Get All Product detail
app.get("/edit", async(req, res)=>{
    const allproducts = await products.find({})
    res.render("editProduct",{title:"Shop-Now", products: allproducts })
 })


//  For Get Detail of Particular Product
 app.get("/editproduct/:id", async(req, res)=>{
    const {id} = req.params;
    const product = await products.findById({_id:id});
    if(product==null){
        res.redirect('edit')
    }else{
        res.render("editSingleProduct",{
            product:product
        })
    }
 })

//  UPdate Product
app.post("/update/:id", async(req, res)=>{
    const {id} = req.params;
    const{title, price} = req.body;
    const updateProduct = await products.findByIdAndUpdate({_id:id},{title, price},{new:true});
    res.redirect("/edit")
})

// Delete Product
app.get("/delete/:id", async(req, res)=>{
    const {id} =req.params;
    const deleteproduct = await products.findByIdAndDelete({_id:id});
    res.redirect("/edit") 
})

// For Cart
app.get("/cart", async(req, res)=>{
    const allproducts = await cart.find({})
    res.render("cart",{title:"Cart", products: allproducts })
 })

//  Add To Cart
app.get("/addcart/:id", async(req, res)=>{
    const {id} =req.params;
    const product = await products.findById({_id:id});
    title = product.title;
    price = product.price;
    const addproduct = new cart({
        title,
        price
    });
    const Productsave = await addproduct.save();
    res.redirect("/cart") 
})

// Remove Item from Cart
app.get("/deleteCart/:id", async(req, res)=>{
    const {id} =req.params;
    const deleteproduct = await cart.findByIdAndDelete({_id:id});
    res.redirect("/cart") 
})

app.listen(port, ()=>{
    console.log(`listening to the ${port}`);
})