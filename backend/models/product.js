const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  image: { type: String },      // This is the product thumbnail
  brochure: { type: String },   // THIS IS THE NEW FIELD FOR THE POPUP
  imageAlt: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Product', productSchema);