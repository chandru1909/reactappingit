const Product = require('../models/productModel');
const  Errorhandler = require('../utils/errorHandler');
const catchAsyncError = require('../middlewares/catchAsyncError');
const ApiFeatures = require('../utils/apiFeatures')

//get products -  /api/v1/product
exports.getproducts = async (req,res,next)=>{
const resPerPage = 2;  
const apiFeatures = new ApiFeatures(Product.find(),req.query).search().filter().paginate(resPerPage);

try {
  const products = await apiFeatures.query;
  res.status(200).json({
      success : true,
      count : products.length,
      message : "This route will show all the products in database",
      products
  })
} catch (error) {
  res.status(500).json({succes:false,message:'ERRROR'})
}
 
}

//create product - /api/v1/product/new
exports.newProduct = catchAsyncError(async(req,res,next)=>{
  const product = await Product.create(req.body);
  res.status(201).json({
    success : true,
    product
  })
});

//get single product - api/v1/product:id
exports.getSingleProduct=async(req,res,next)=>{

const product = await Product.findById(req.params.id)
 
  if (!product) {
    return next( new Errorhandler('Product not found',400)) 
  }
  res.status(201).json({
    success : true,
    product
  })
}

//Update Product - api/v1/product:id
exports.updateProduct=async(req,res,next)=>{

  let product = await Product.findById(req.params.id)
   
    if (!product) {
      return res.status(404).json({
        success : false,
        message : "Product no found"
      });
    }

    product = await Product.findByIdAndUpdate(req.params.id,req.body,{
      new : true,
      runValidators : true
 }) 
    res.status(200).json({
      success : true,
      product
    })
  }

//Delete Product - api/v1/product:id

  exports.deleteProduct = async (req,res,next)=>{

  let product = await Product.findById(req.params.id)
   
  if (!product) {
    return res.status(404).json({
      success : false,
      message : "Product no found"
    });
  }
  await product.remove();
  res.status(200).json({
    success : true,
    message : "Product Deleted!",
    product
  })
  }