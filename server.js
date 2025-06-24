const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const todoRoutes = require('./routes/todoRoutes');
require('dotenv').config();

const app = express();

// ✅ CORS Middleware - Allow Netlify Frontend
app.use(cors({
  origin: 'https://precious-cucurucho-ae8f10.netlify.app'
}));

// Middleware
app.use(express.json());

// ✅ MongoDB Atlas Connection
const mongoURI = process.env.MONGO_URI || 'mongodb+srv://pallahemahimaja:hemahimaja@cluster0.7ijjcut.mongodb.net/todolist?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ Connected to MongoDB Atlas'))
.catch((err) => console.error('❌ MongoDB connection error:', err));

// Root Test Route
app.get('/', (req, res) => {
  res.send('🟢 Todo API is running. Use /api/todos for API access.');
});

// Todo Routes
app.use('/api/todos', todoRoutes);

// Server Listen
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
