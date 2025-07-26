const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const saleRoutes = require('./routes/sales');
const expenseRoutes = require('./routes/expenses');
const summaryRoutes = require('./routes/summary');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/sales', saleRoutes);
app.use('/api/expenses', expenseRoutes);
app.use('/api/summary', summaryRoutes);

app.get('/', (req, res) => {
  res.send('Gustanto POS backend is live!');
});

const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server running on port ${PORT}`)))
  .catch(err => console.error('MongoDB connection error:', err));
