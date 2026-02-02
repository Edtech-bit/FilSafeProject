const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String },
  image: { type: String }, // URL or path to the image
  category: { type: String, enum: ['CCTV', 'Alarm', 'Vault', 'Other'], default: 'Other' },
  dateAdded: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Product', productSchema);