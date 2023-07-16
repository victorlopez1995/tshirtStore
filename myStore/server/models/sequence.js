const mongoose = require('mongoose');

const SequenceSchema = mongoose.Schema({
    maxProductId: { type: Number, required: true }
});

module.exports = mongoose.model('Sequence', SequenceSchema);