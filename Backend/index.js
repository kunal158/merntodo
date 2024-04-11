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
app.use(cors({
  origin: 'https://todoinggg.vercel.app',
  credentials: true // If your frontend uses cookies or authorization headers
}));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'https://todoinggg.vercel.app');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});



// Routes
app.use("/api", signup);
app.use("/api", login);
app.use("/api/task", taskRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  res.status(200).json({ message: "Internal server error" });
});

// Start the server
// Start the server
app.listen(() => {
  console.log(`Server running`);
});

