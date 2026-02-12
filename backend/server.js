require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const User = require('./models/user');
const Blog = require('./models/blog');
const Product = require('./models/product');

const app = express();

const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: '50mb' }));

app.use(cors({
  origin: [
    'http://localhost:4200', 
    'https://filsafe.shop',
    'https://www.filsafe.shop',
    /\.hostingerapp\.com$/ 
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// DATABASE CONNECTION
mongoose.connect(MONGO_URI)
  .then(() => console.log('✅ Connected to MongoDB Atlas'))
  .catch(err => console.error('❌ DB Error:', err.message));

// --- BLOG ROUTES ---
app.get('/api/blogs', async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching blogs' });
  }
});

app.get('/api/blogs/:id', async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: 'Blog not found' });
    res.json(blog);
  } catch (err) {
    res.status(500).json({ message: 'Invalid ID format' });
  }
});

app.post('/api/blogs', async (req, res) => {
  try {
    const newBlog = new Blog(req.body);
    const savedBlog = await newBlog.save();
    res.status(201).json(savedBlog);
  } catch (err) {
    res.status(400).json({ message: 'Save failed' });
  }
});

app.put('/api/blogs/:id', async (req, res) => {
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedBlog) return res.status(404).json({ message: 'Not found' });
    res.json(updatedBlog);
  } catch (err) {
    res.status(400).json({ message: 'Update failed' });
  }
});

app.delete('/api/blogs/:id', async (req, res) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Delete failed' });
  }
});

// --- PRODUCT ROUTES ---
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'Error' });
  }
});

app.post('/api/products', async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    res.status(400).json({ message: 'Product save failed' });
  }
});

app.put('/api/products/:id', async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedProduct) return res.status(404).json({ message: 'Product not found' });
    res.json(updatedProduct);
  } catch (err) {
    res.status(400).json({ message: 'Update failed' });
  }
});

app.delete('/api/products/:id', async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: 'Product Deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Delete failed' });
  }
});

app.get('/', (req, res) => {
  res.send('FilSafe API is running successfully!');
});

app.listen(PORT, () => console.log(`🚀 Server on port ${PORT}`));