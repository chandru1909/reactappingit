const Errorhandler = require("../utils/errorHandler");
const catchAsyncError = require("./catchAsyncError");
const User = require('../models/userModel') ;
const jwt = require('jsonwebtoken');

exports.isAuthenticatedUser = catchAsyncError(async(req,res,next)=>{
  const {token} = req.cookies;

  if (!token) {
    return next(new Errorhandler('Login first to handle this resource',401))
  }

  const decode = jwt.verify(token,process.env.JWT_SECRET)
  req.user = await User.findById(decode.id)
  next(); 
})

exports.authorizeRole = (...roles) =>{
   return (req,res,next)=>{
        if (!roles.includes(req.user.role)) {
            return next(new Errorhandler(`Role ${req.user.role} is not allowed`,401))
        }
        next()
    }
}