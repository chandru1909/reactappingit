const express = require('express');
const { getproducts, newProduct, getSingleProduct, updateProduct, deleteProduct } = require('../controllers/productController');
const router = express.Router();
const {isAuthenticatedUser, authorizeRole} = require('../middlewares/authenticate')

router.route('/product').get(isAuthenticatedUser,getproducts);
router.route('/product/new').post(isAuthenticatedUser,authorizeRole('admin'), newProduct)
router.route('/product/:id').get(getSingleProduct)
                            .put(updateProduct)
                             .delete(deleteProduct)
module.exports=router;