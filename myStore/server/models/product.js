const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
   id: { type: String, required: true },
   name: { type: String, required: true },
   picture: { type: String, required: true },
});

module.exports = mongoose.model('tshirt', productSchema);