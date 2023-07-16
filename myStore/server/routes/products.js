var express = require('express');
var router = express.Router();
const sequenceGenerator = require('./sequenceGenerator');
const Product = require('../models/product');

router.get('/', (req, res, next) => {
    Product.find()
      .then((products) => {
        res.status(200).json(products);
      })
      .catch((error) => {
        res.status(500).json({ error: error.message });
      });
  });

  
// router.post('/', (req, res, next) => {
//     const maxDocumentId = sequenceGenerator.nextId("documents");
  
//     const document = new Product({
//       id: maxDocumentId,
//       name: req.body.name,
//       description: req.body.description,
//       url: req.body.url
//     });
  
//     document.save()
//       .then(createdDocument => {
//         res.status(201).json({
//           message: 'Product added successfully',
//           document: createdDocument
//         });
//       })
//       .catch(error => {
//          res.status(500).json({
//             message: 'An error occurred',
//             error: error
//           });
//       });
//   });


//   router.put('/:id', (req, res, next) => {
//     Product.findOne({ id: req.params.id })
//       .then(document => {
//         document.name = req.body.name;
//         document.description = req.body.description;
//         document.url = req.body.url;
  
//         Product.updateOne({ id: req.params.id }, document)
//           .then(result => {
//             res.status(204).json({
//               message: 'Product updated successfully'
//             })
//           })
//           .catch(error => {
//              res.status(500).json({
//              message: 'An error occurred',
//              error: error
//            });
//           });
//       })
//       .catch(error => {
//         res.status(500).json({
//           message: 'Product not found.',
//           error: { document: 'Product not found'}
//         });
//       });
//   });  
  
router.delete("/:id", (req, res, next) => {
    Product.findOne({ id: req.params.id })
      .then(document => {
        Product.deleteOne({ id: req.params.id })
          .then(result => {
            res.status(204).json({
              message: "Product deleted successfully"
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
          message: 'Product not found.',
          error: { document: 'Product not found'}
        });
      });
  });


  module.exports = router; 