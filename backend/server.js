require('dotenv').config(); // Load environment variables at the very top
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
const axios = require('axios');

const User = require('./models/user');
const Blog = require('./models/blog');
const Product = require('./models/product');

const app = express();

// --- CONFIG FROM .ENV ---
const GA_MEASUREMENT_ID = process.env.GA_MEASUREMENT_ID;
const GA_API_SECRET = process.env.GA_API_SECRET;
const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT || 3000;

const sendGAEvent = async (eventName, params = {}) => {
  try {
    const payload = {
      client_id: 'server_side_user',
      events: [{
        name: eventName,
        params: params,
      }]
    };
    await axios.post(
      `https://www.google-analytics.com/mp/collect?measurement_id=${GA_MEASUREMENT_ID}&api_secret=${GA_API_SECRET}`,
      payload
    );
  } catch (err) {
    console.error('GA Tracking Error:', err.message);
  }
};

// --- MIDDLEWARE ---
app.use(express.json({ limit: '1000mb' }));
app.use(express.urlencoded({ limit: '1000mb', extended: true, parameterLimit: 1000000 }));
app.use(cors({
  origin: 'http://localhost:4200',
  methods: ['GET', 'POST', 'DELETE', 'PUT'],
  credentials: true
}));

// --- DATABASE CONNECTION ---
// Pulls the URI directly from .env
mongoose.connect(MONGO_URI)
  .then(() => console.log(`✅ Connected to MongoDB Atlas Successfully`))
  .catch(err => {
    console.error('❌ Connection failed:', err.message);
    process.exit(1); // Stop server if DB connection fails
  });

// --- AUTH ROUTES ---
app.post('/api/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ message: 'User not found' });
    
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(400).json({ message: 'Invalid password' });
    
    sendGAEvent('login', { method: 'credentials', username: username });
    res.json({ status: 'success', message: 'Logged in' });
  } catch (err) {
    res.status(500).json({ message: 'Login error' });
  }
});

// --- BLOGS ---
app.get('/api/blogs', async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 }); 
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching blogs' });
  }
});

app.post('/api/blogs', async (req, res) => {
  try {
    const newBlog = new Blog(req.body);
    const savedBlog = await newBlog.save();
    sendGAEvent('create_blog', { blog_title: req.body.title });
    res.status(201).json(savedBlog);
  } catch (err) {
    res.status(400).json({ message: 'Save failed.', error: err.message });
  }
});

app.delete('/api/blogs/:id', async (req, res) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);
    res.json({ message: 'Blog Deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Delete failed' });
  }
});

// --- PRODUCTS ---
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
    sendGAEvent('add_product', { product_name: req.body.name });
    res.status(201).json(savedProduct);
  } catch (err) {
    console.error('SERVER ERROR ON SAVE:', err.message); 
    res.status(400).json({ message: 'Validation or Save Error', error: err.message });
  }
});

app.delete('/api/products/:id', async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: 'Removed' });
  } catch (err) {
    res.status(500).json({ message: 'Error' });
  }
});

app.listen(PORT, () => console.log(` Backend live on port ${PORT}`));