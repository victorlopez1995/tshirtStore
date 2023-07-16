var express = require('express');
var router = express.Router();
const sequenceGenerator = require('./sequenceGenerator');
const CartProduct = require('../models/cart');

router.get('/', (req, res, next) => {
    CartProduct.find()
      .then((products) => {
        res.status(200).json(products);
      })
      .catch((error) => {
        res.status(500).json({ error: error.message });
      });
  });

  
router.post('/', (req, res, next) => {
    // const maxProductId = sequenceGenerator.nextId("documents"); 
    const product = new CartProduct({
      id: req.body.id,
      name: req.body.name,
      picture: req.body.picture
    });
  
    product.save()
      .then(createdProduct => {
        res.status(201).json({
          message: 'CartProduct added successfully',
          product: createdProduct
        });
      })
      .catch(error => {
         res.status(500).json({
            message: 'An error occurred',
            error: error
          });
      });
  });


  
router.delete("/:id", (req, res, next) => {
    CartProduct.findOne({ id: req.params.id })
      .then(document => {
        CartProduct.deleteOne({ id: req.params.id })
          .then(result => {
            res.status(204).json({
              message: "CartProduct deleted successfully"
            });
          })
          .catch(error => {
             res.status(500).json({
             message: 'An error occurred',
             error: error
           });
          })
      })
      .catch(error => {
        res.status(500).json({
          message: 'CartProduct not found.',
          error: { document: 'CartProduct not found'}
        });
      });
  });


  module.exports = router; 