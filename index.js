// Basic Express server setup
const express = require('express');
const app = express();
const port = 3000;

// MongoDB connection setup
const mongoose = require('mongoose');
const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/jobtracker', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('MongoDB connected');
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

// Middleware
app.use(express.json());

// Routes will be added here

// Start server
const start = async () => {
  await connectDB();
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
};

