const mongoose = require('mongoose');

const cartSchema = mongoose.Schema({
   id: { type: String, required: true },
   name: { type: String, required: true },
   picture: { type: String, required: true },
});

module.exports = mongoose.model('cartproduct', cartSchema);