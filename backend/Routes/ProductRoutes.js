const express = require('express');
const router = express.Router();
const ProductController = require('../Controllers/ProductController');

//rota 
router.post('/produtos', ProductController.Addproduct);

router.post('/produtos/:id', ProductController.UpdatedProduct);

router.delete('/produtos/:id', ProductController.DeleteProduct);

router.get('/produtos/:id', ProductController.Showproduct);

module.exports = router;