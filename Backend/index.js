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
app.use(cors());


// Routes
app.use("/api/signup", signup);
app.use("/api/signin", signin);
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

