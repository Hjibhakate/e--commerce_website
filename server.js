const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Debug: check MongoDB URI loaded
console.log("MONGO_URI:", process.env.MONGO_URI);

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => console.log('✅ MongoDB connected!'));

// Product schema
const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
});
const Product = mongoose.model('Product', productSchema);

// Routes
app.get('/api/products', async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

app.post('/api/cart', async (req, res) => {
  console.log('🛒 Cart item received:', req.body);
  res.status(200).json({ message: 'Item added to cart' });
});

// Seed products (only once)
const seedProducts = async () => {
  const count = await Product.countDocuments();
  if (count === 0) {
    await Product.insertMany([
      { name: 'Classic Burger', price: 5.99 },
      { name: 'Cheesy Pizza', price: 8.49 },
      { name: 'French Fries', price: 3.99 },
    ]);
    console.log('🌱 Products seeded');
  }
};
seedProducts();

// Start server
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
