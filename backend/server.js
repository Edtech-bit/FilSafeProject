const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
const axios = require('axios'); // Added axios for GA4 requests

const User = require('./models/user');
const Blog = require('./models/blog');
const Product = require('./models/product');

const app = express();

// --- GOOGLE ANALYTICS CONFIG ---
// Replace these with your actual GA4 values from Admin > Data Streams
const GA_MEASUREMENT_ID = 'G-XXXXXXXXXX'; 
const GA_API_SECRET = 'YOUR_API_SECRET_HERE'; 

const sendGAEvent = async (eventName, params = {}) => {
  try {
    const payload = {
      client_id: 'server_side_user', // Ideally a unique ID from the user's session
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

// This effectively removes the Express limit
app.use(express.json({ limit: '1000mb' }));
app.use(express.urlencoded({ limit: '1000mb', extended: true, parameterLimit: 1000000 }));
app.use(cors());

// --- DATABASE CONNECTION CONFIG ---
const useLocal = false; 

const localURI = 'mongodb://127.0.0.1:27017/filsafe_db';
const cloudURI = 'mongodb+srv://castilloed7899:castilloed7899@cluster0.dipyeud.mongodb.net/filsafe_db?retryWrites=true&w=majority&appName=Cluster0';

const connectionString = useLocal ? localURI : cloudURI;

mongoose.connect(connectionString)
  .then(() => console.log(`Connected to ${useLocal ? 'LOCAL' : 'CLOUD'} MongoDB Successfully`))
  .catch(err => {
    console.error('Connection failed:', err);
  });

// --- AUTH ---
app.post('/api/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ message: 'User not found' });
    
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(400).json({ message: 'Invalid password' });
    
    // TRACKING: Log successful login
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

app.get('/api/blogs/:id', async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: 'Blog not found' });
    res.json(blog);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/api/blogs', async (req, res) => {
  try {
    const newBlog = new Blog({
      title: req.body.title,
      shortDescription: req.body.shortDescription, 
      content: req.body.content,                   
      image: req.body.image,
      imageAlt: req.body.imageAlt 
    });
    const savedBlog = await newBlog.save();

    // TRACKING: Log blog creation
    sendGAEvent('create_blog', { blog_title: req.body.title });

    res.status(201).json(savedBlog);
  } catch (err) {
    console.error('SAVE ERROR:', err);
    res.status(400).json({ message: 'Save failed.', error: err.message });
  }
});

app.put('/api/blogs/:id', async (req, res) => {
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedBlog);
  } catch (err) {
    res.status(400).json({ message: 'Update failed' });
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
    await newProduct.save();

    // TRACKING: Log product addition
    sendGAEvent('add_product', { product_name: req.body.name });

    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ message: 'Error' });
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

app.listen(3000, () => console.log('Backend live.'));