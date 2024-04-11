// Import required modules
const express = require("express");
const cors = require("cors");
const connectDB = require("./db/db"); // Import the connectDB function
const signup = require("./routes/signup.routes");
const login = require("./routes/login.routes");
const taskRoutes = require("./routes/task.routes");
const dotenv = require("dotenv"); // Import dotenv

// Load environment variables from .env file
dotenv.config();

// Initialize Express app
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());

// Enable CORS using the allowCors middleware function
const allowCors = (fn) => async (req, res) => {
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  return await fn(req, res);
};

// Apply allowCors to all routes
app.use(allowCors);

// Routes
app.use("/api", signup);
app.use("/api", login);
app.use("/api/task", taskRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  res.status(200).json({ message: "Internal server error" });
});

// Start the server
app.listen(() => {
  console.log(`Server running`);
});
