require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
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
    'https://www.filsafe.shop'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

mongoose.connect(MONGO_URI)
  .then(() => console.log('✅ Connected to MongoDB Atlas'))
  .catch(err => console.error('❌ DB Error:', err.message));

// --- LOGIN ROUTE (WITH DEBUG LOGS) ---
app.post('/api/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    console.log(`--- Login attempt for username: "${username}" ---`);

    const user = await User.findOne({ username });
    if (!user) {
      console.log(`❌ FAILED: User "${username}" not found in database.`);
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    console.log(`✅ User found. Comparing hashes...`);

    const isMatch = await bcrypt.compare(password, user.password);
    console.log(`🔍 Password comparison result: ${isMatch}`);

    if (!isMatch) {
      console.log(`❌ FAILED: Password mismatch for user "${username}".`);
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    console.log(`🎉 SUCCESS: Login successful for user "${username}".`);
    res.json({ message: 'Login successful', status: 'success' });
  } catch (err) {
    console.error('🔥 CRITICAL ERROR:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// BLOG ROUTES
app.get('/api/blogs', async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ message: 'Error' });
  }
});

app.get('/api/blogs/:id', async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    res.json(blog);
  } catch (err) {
    res.status(404).json({ message: 'Not found' });
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
    const updated = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
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

// PRODUCT ROUTES
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
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
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