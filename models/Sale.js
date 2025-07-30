const mongoose = require('mongoose');

const saleSchema = new mongoose.Schema({
  time: String,
  total: Number,
  items: Array,
});

module.exports = mongoose.models.Sale || mongoose.model('Sale', saleSchema);
