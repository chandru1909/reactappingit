const products = require("../data/products.json");
const product = require('../models/productModel');
const dotenv = require("dotenv");
const connectDatabase = require('../config/database');

dotenv.config({path:'backend/config/config.env'});
connectDatabase();


const seederProducts =async ()=>{
    try{
    await product.deleteMany();
    await product.insertMany(products);
    console.log("All prodtucts added !");
    }catch(error){
          console.log(error.message);
    }
    process.exit();
}
seederProducts();