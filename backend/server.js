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

// Increase limit for base64 images
app.use(express.json({ limit: '50mb' }));
app.use(cors({ origin: 'http://localhost:4200' }));

// DATABASE CONNECTION
mongoose.connect(MONGO_URI)
  .then(() => console.log('✅ Connected to MongoDB Atlas'))
  .catch(err => console.error('❌ DB Error:', err.message));

// --- BLOG ROUTES ---

// GET ALL BLOGS
app.get('/api/blogs', async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching blogs' });
  }
});

// GET SINGLE BLOG
app.get('/api/blogs/:id', async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: 'Blog not found' });
    res.json(blog);
  } catch (err) {
    res.status(500).json({ message: 'Invalid ID format' });
  }
});

// CREATE BLOG
app.post('/api/blogs', async (req, res) => {
  try {
    const newBlog = new Blog(req.body);
    const savedBlog = await newBlog.save();
    res.status(201).json(savedBlog);
  } catch (err) {
    res.status(400).json({ message: 'Save failed' });
  }
});

/** * UPDATE BLOG 
 * This is the route the 404 was looking for!
 */
app.put('/api/blogs/:id', async (req, res) => {
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true, runValidators: true }
    );
    if (!updatedBlog) {
      return res.status(404).json({ message: 'Blog ID not found in database' });
    }
    res.json(updatedBlog);
  } catch (err) {
    console.error("PUT Error:", err);
    res.status(400).json({ message: 'Update failed', error: err.message });
  }
});

// DELETE BLOG
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

/** * UPDATE PRODUCT 
 */
app.put('/api/products/:id', async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true }
    );
    if (!updatedProduct) return res.status(404).json({ message: 'Product not found' });
    res.json(updatedProduct);
  } catch (err) {
    res.status(400).json({ message: 'Update failed' });
  }
});

app.delete('/api/products/:id', async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Delete failed' });
  }
});

app.listen(PORT, () => console.log(`🚀 Server on port ${PORT}`));