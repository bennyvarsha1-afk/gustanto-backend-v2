const mongoose = require('mongoose');
const itemSchema = new mongoose.Schema({ name: String, price: Number, quantity: Number });
const saleSchema = new mongoose.Schema({ items: [itemSchema], total: Number, createdAt: { type: Date, default: Date.now } });
module.exports = mongoose.model('Sale', saleSchema);